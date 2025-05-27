import Link from "next/link";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar border-b">
      <Link href="/">
        <div className="relative cursor-pointer group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-45 transition duration-500 animate-gradient" />
          <h1 className="relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 tracking-tight">
            Convo AI
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <p>Sign In</p>
      </div>
    </nav>
  );
};

export default Navbar;
