function EventCard({ event, onDelete, onBook }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">

      <div className="relative h-56 overflow-hidden">
        <img
          src={`${event.image}?auto=format&fit=crop&w=800&q=80`}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
          <h2 className="text-white text-xl font-bold">
            {event.title}
          </h2>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between text-sm text-gray-600 mb-5">
          <span>📅 {event.date}</span>
          <span>📍 {event.location}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onBook(event)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 rounded-xl font-semibold"
          >
            🎟 Book Now
          </button>

          <button
            onClick={() => onDelete(event.id)}
            className="px-4 bg-red-500 text-white rounded-xl"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;