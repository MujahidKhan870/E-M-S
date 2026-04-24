import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData, saveData } from "../utils/storage";

function MyBookings() {
  const location = useLocation();
  const selectedEvent = location.state || null;

  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    tickets: 1,
  });

  const [toast, setToast] = useState("");

  const generateToken = () => {
    return "EVT-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const all = getData("bookings") || [];
    setBookings(all.filter((b) => b.user === user.email));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const all = getData("bookings") || [];

    const token = generateToken();

    const newBooking = {
      id: Date.now(),
      event: selectedEvent,
      user: user.email,
      token,
      ...form,
    };

    const updated = [...all, newBooking];
    saveData("bookings", updated);

    setBookings(updated.filter((b) => b.user === user.email));

    setToast(`🎉 Ticket Booked! Token: ${token}`);

    setForm({ name: "", phone: "", address: "", tickets: 1 });

    setTimeout(() => setToast(""), 3000);
  };

  const cancelBooking = (id) => {
    const confirm = window.confirm("Cancel this ticket?");
    if (!confirm) return;

    const all = getData("bookings") || [];
    const updated = all.filter((b) => b.id !== id);

    saveData("bookings", updated);

    const user = JSON.parse(localStorage.getItem("user"));
    setBookings(updated.filter((b) => b.user === user.email));

    setToast("❌ Ticket Cancelled");

    setTimeout(() => setToast(""), 3000);
  };

  const downloadTicket = (b) => {
    const content = `
Event: ${b.event.title}
Date: ${b.event.date}
Location: ${b.event.location}

Name: ${b.name}
Phone: ${b.phone}
Address: ${b.address}

Tickets: ${b.tickets}
Token: ${b.token}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ticket-${b.token}.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* 🔥 PREMIUM HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            🎟 My Bookings
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            View, manage and download your event tickets
          </p>
        </div>

        {/* TOAST */}
        {toast && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg animate-slideIn z-50">
            {toast}
          </div>
        )}

        {/* FORM */}
        {selectedEvent && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10 border">

            <img
              src={selectedEvent.image}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
              <p className="text-gray-500">
                📅 {selectedEvent.date} • 📍 {selectedEvent.location}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 border-t bg-gray-50"
            >
              <input
                placeholder="Full Name"
                className="w-full mb-3 p-3 border rounded-xl"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                placeholder="Phone"
                className="w-full mb-3 p-3 border rounded-xl"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />

              <textarea
                placeholder="Address"
                className="w-full mb-3 p-3 border rounded-xl"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />

              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:scale-[1.02] transition">
                Confirm Booking
              </button>
            </form>
          </div>
        )}

        {/* EMPTY */}
        {bookings.length === 0 ? (
          <div className="text-center mt-20">
            <div className="text-6xl">🎫</div>
            <h2 className="text-xl font-bold text-gray-600 mt-3">
              No Tickets Booked Yet
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border
                           hover:shadow-2xl hover:-translate-y-1
                           transition-all duration-300"
              >

                <img
                  src={b.event.image}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4 flex gap-4 items-center">

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{b.event.title}</h3>

                    <p className="text-xs text-gray-500">📅 {b.event.date}</p>
                    <p className="text-xs text-gray-500">📍 {b.event.location}</p>

                    <p className="mt-2 text-sm">
                      🎟 Token:
                      <span className="font-bold text-blue-600 ml-1">
                        {b.token}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600">
                      🎫 {b.tickets} Ticket(s)
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${b.token}`}
                      className="rounded-lg hover:scale-105 transition"
                    />

                    <button
                      onClick={() => downloadTicket(b)}
                      className="mt-2 text-xs bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                    >
                      Download
                    </button>
                  </div>

                </div>

                <div className="px-4 pb-4">
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="w-full bg-red-500 text-white py-2 rounded-xl text-sm hover:bg-red-600 transition"
                  >
                    Cancel Ticket
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

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

export default MyBookings;
