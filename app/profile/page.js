'use client';
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../loading";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  const fetchsaves = async () => {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_meri, { cache: 'no-store' });
      const data = await res.json();
      const arr = JSON.parse(data.message);
      const responses = await Promise.all(
        arr.map(element =>
          fetch(`${process.env.NEXT_PUBLIC_api}/${element}`, { cache: 'no-store' }).then(res => res.json())
        )
      );
      setCollection(responses);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchsaves();
  }, []);

  if (status === "loading") return null;
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Loader />
    </div>
  );

  if (session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Header Section */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 group"
                  title="Go to Home"
                >
                  <svg className="w-6 h-6 text-white group-hover:text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </Link>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Welcome Back, {session.user.name?.split(' ')[0]}!
                  </h1>
                  <p className="text-slate-400 text-sm">{session.user.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: window.location.href })}
                className="px-6 py-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 font-medium hover:bg-red-600/30 hover:text-red-300 transition-all duration-200 backdrop-blur-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Your Saved Recipes
            </h2>
            <p className="text-slate-400">
              {collection?.length || 0} recipe{collection?.length !== 1 ? 's' : ''} in your collection
            </p>
          </div>

          {/* Recipe Grid */}
          {collection && collection.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {collection.map((rec) => (
                <Link key={rec.id} href={`/searchresults/recipes/${rec.id}`}>
                  <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                    {/* Recipe Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Recipe Details */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                        {rec.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>{rec.caloriesPerServing} cal</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>{rec.cookTimeMinutes} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover effect border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 pointer-events-none" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                <span className="text-4xl">🍳</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-slate-300">No saved recipes yet</h3>
              <p className="text-slate-400 mb-6">Start exploring and save your favorite recipes!</p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                <span>🔍</span>
                Discover Recipes
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
          🍳
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Sign In
        </h1>
        <p className="text-slate-300 mb-8">Access your recipe collection</p>
        
        {/* Add your authentication buttons here */}
        <div className="text-slate-400 text-sm">
          Please add your authentication provider buttons here
        </div>
      </div>
    </div>
  );
}