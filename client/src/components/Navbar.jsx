import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md py-4 px-6 z-50">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        AI Recipe Planner
      </h2>
    </nav>
  );
}

export default Navbar;
