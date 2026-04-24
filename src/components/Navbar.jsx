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

      <div className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap justify-between items-center px-4 md:px-6 py-4 gap-3">

        {/* LOGO */}
        <h1 className="flex items-center gap-2 text-lg md:text-xl font-extrabold tracking-wide">
          <span className="text-2xl">🎟</span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Event Manager
          </span>
        </h1>

        {/* LINKS */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-6 text-xs md:text-sm font-medium">

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
            </Link>
          ))}

          {/* AUTH */}
          {!user ? (
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 md:px-5 py-2 rounded-xl text-white font-semibold shadow-md hover:scale-105 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 md:px-5 py-2 rounded-xl text-white font-semibold shadow-md hover:bg-red-600 hover:scale-105 transition"
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