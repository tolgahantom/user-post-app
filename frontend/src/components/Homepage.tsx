import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 text-center">
        User-Post Application
      </h1>

      <div className="flex flex-col sm:flex-row gap-8">
        <Link
          to="/users"
          className="flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-6 rounded-xl text-2xl font-semibold shadow-xl transform hover:scale-105 hover:bg-blue-700 transition"
        >
          <i className="fa-solid fa-user"></i> Users
        </Link>

        <Link
          to="/posts"
          className="flex items-center justify-center gap-3 bg-green-600 text-white px-10 py-6 rounded-xl text-2xl font-semibold shadow-xl transform hover:scale-105 hover:bg-green-700 transition"
        >
          <i className="fa-regular fa-paste"></i> Posts
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
