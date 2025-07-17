import Image from "next/image";
import Link from "next/link";

export default async function Page({ searchParams }) {
  const query = searchParams.query || ""; // fallback to empty string
  const res = await fetch(`${process.env.NEXT_PUBLIC_api}/search?q=${query}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search Results for "{query}" ({data.recipes.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.recipes.map((rec) => (
          <Link key={rec.id} href={`/searchresults/recipes/${rec.id}`}>
            <div className="border rounded-2xl shadow-lg p-4 hover:shadow-xl transition duration-200 cursor-pointer bg-white">
              <h2 className="text-lg font-semibold mb-2">{rec.name}</h2>
              <p className="text-gray-700 text-sm">
                Calories: {rec.caloriesPerServing}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                Time: {rec.cookTimeMinutes} minutes
              </p>
              <div className="relative w-full h-40">
                <Image
                  src={rec.image}
                  alt={rec.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
