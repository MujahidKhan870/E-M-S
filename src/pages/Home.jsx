import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, saveData } from "../utils/storage";
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let data = getData("events");

    if (!data || data.length === 0) {
      data = [
        {
          id: 1,
          title: "Tech Conference 2026",
          date: "2026-05-10",
          location: "Delhi",
          image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          title: "Music Festival",
          date: "2026-06-15",
          location: "Mumbai",
          image:
            "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          title: "Startup Meetup",
          date: "2026-07-01",
          location: "Bangalore",
          image:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 4,
          title: "Food Carnival",
          date: "2026-08-12",
          location: "Jaipur",
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 5,
          title: "AI Summit",
          date: "2026-09-10",
          location: "Pune",
          image:
            "https://images.unsplash.com/photo-1581091870620-1f4f4b1f5b5a?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 6,
          title: "Design Workshop",
          date: "2026-10-05",
          location: "Hyderabad",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        },
      ];

      saveData("events", data);
    }

    setEvents(data);
  }, []);

  const bookEvent = (event) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Login first!");

    navigate("/my-bookings", { state: event });
  };

  const deleteEvent = (id) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveData("events", updated);
  };

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-14 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          {/* LEFT TEXT */}
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-2">
              🎫 Event Hub
            </h1>

            <p className="text-white/80 mt-2 text-sm md:text-base max-w-md">
              Book & manage events easily
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              🔍
            </span>

            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl text-black outline-none"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* GRID */}
        <h2 className="text-2xl font-bold mb-5">🔥 Trending Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filtered.slice(0, 4).map((e) => (
            <EventCard
              key={e.id}
              event={e}
              onBook={bookEvent}
              onDelete={deleteEvent}
            />
          ))}
        </div>

        {/* HORIZONTAL */}
        <h2 className="text-2xl font-bold mb-5">⭐ Featured Experiences</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 mb-12 scrollbar-hide">
          {filtered.slice(4).map((e) => (
            <div key={e.id} className="min-w-[300px]">
              <EventCard
                event={e}
                onBook={bookEvent}
                onDelete={deleteEvent}
              />
            </div>
          ))}
        </div>

        {/* LIST */}
        <h2 className="text-2xl font-bold mb-5">📌 Latest Events</h2>

        <div className="space-y-4">
          {filtered.map((e) => (
            <div
              key={e.id}
              className="flex items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <img
                src={e.image}
                className="w-20 h-20 rounded-xl object-cover"
                alt={e.title}
              />

              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-lg">{e.title}</h3>
                <p className="text-sm text-gray-500">
                  📅 {e.date} • 📍 {e.location}
                </p>
              </div>

              <button
                onClick={() => bookEvent(e)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl"
              >
                Book
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;