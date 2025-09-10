import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to={"/"}>
          <h1 className="text-2xl font-bold">User-Post Application</h1>
        </NavLink>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                : "hover:text-yellow-300 transition"
            }
          >
            <i className="fa-solid fa-home"></i> Home
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                : "hover:text-yellow-300 transition"
            }
          >
            <i className="fa-solid fa-user"></i> Users
          </NavLink>

          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                : "hover:text-yellow-300 transition"
            }
          >
            <i className="fa-solid fa-paste"></i> Posts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
