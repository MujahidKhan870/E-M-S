import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-wide">
          <span className="text-2xl">🎟</span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Event Manager
          </span>
        </h1>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          {[
            { path: "/", label: "Home" },
            { path: "/dashboard", label: "Add Event" },
            { path: "/my-bookings", label: "My Bookings" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-2 py-1 transition ${
                isActive(link.path)
                  ? "text-blue-400"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}

              {/* underline animation */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${
                  isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}

          {/* AUTH */}
          {!user ? (
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-xl text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-5 py-2 rounded-xl text-white font-semibold shadow-md hover:bg-red-600 hover:scale-105 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default Navbar;