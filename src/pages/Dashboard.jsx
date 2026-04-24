import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import { getData, saveData } from "../utils/storage";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const data = getData("events");
    setEvents(data || []);
  }, []);

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now(),
    };

    const updated = [...events, newEvent];

    setEvents(updated);
    saveData("events", updated);

    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9] p-6 relative">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-5 py-2 rounded-xl shadow-lg animate-slideIn z-50 text-sm">
          🎉 Event Added Successfully!
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-10">

        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          🎯 Event Dashboard
        </h1>

        <p className="text-gray-500 mt-2 text-sm">
          Create, manage and organize your events easily
        </p>

      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            ➕ Create Event
          </h2>

          <EventForm onAdd={addEvent} />
        </div>

        {/* PREVIEW */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📌 Live Preview
          </h2>

          <div className="space-y-3">

            {events.length === 0 ? (
              <div className="text-center text-gray-400 mt-10 text-sm">
                No events added yet
              </div>
            ) : (
              events.slice(0, 6).map((e) => (
                <div
                  key={e.id}
                  className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl hover:bg-gray-100 transition"
                >
                  <img
                    src={e.image}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {e.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      📍 {e.location}
                    </p>
                    <p className="text-xs text-gray-400">
                      📅 {e.date}
                    </p>
                  </div>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

      {/* ANIMATION */}
      <style>
        {`
          .animate-slideIn {
            animation: slideIn 0.4s ease;
          }
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>

    </div>
  );
}

export default Dashboard;