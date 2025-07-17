import Search from "../search/SearchModal";

export const metadata = {
  title: "Recipie Wala",
  description: "Welcome to recipie wala",
};

export default function Layout({ children }) {
  return (
    <>

        <Search className="mt-8" />
        {children}
    </>
  );
}
