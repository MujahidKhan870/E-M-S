import { useState } from "react";

function EventForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📸 IMAGE UPLOAD HANDLER
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.location) {
      alert("Please fill all required fields");
      return;
    }

    onAdd(form);

    setForm({
      title: "",
      date: "",
      location: "",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* TITLE */}
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      {/* DATE */}
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      {/* LOCATION */}
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400"
      />

      {/* 📸 IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full border p-3 rounded-lg bg-gray-50"
      />

      {/* IMAGE PREVIEW */}
      {form.image && (
        <img
          src={form.image}
          alt="preview"
          className="w-full h-40 object-cover rounded-lg border"
        />
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        ➕ Add Event
      </button>

    </form>
  );
}

export default EventForm;