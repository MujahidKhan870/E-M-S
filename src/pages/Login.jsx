import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../utils/storage";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = getData("users");
    const found = users.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const register = () => {
    const users = getData("users");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered! Now login.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-white border border-white/20">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 p-3 rounded-xl bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-xl bg-white/20 placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl mb-3 hover:bg-purple-100 transition"
        >
          Login
        </button>

        {/* REGISTER BUTTON */}
        <button
          onClick={register}
          className="w-full bg-green-500 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          Create Account
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-white/70 mt-4">
          Secure access to your events 🎟
        </p>

      </div>

    </div>
  );
}

export default Login;