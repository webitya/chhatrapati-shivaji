"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Trash2, Eye } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "Other",
    image: "",
  });

  // Fetch Events
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", description: "", date: "", category: "Other", image: "" });
    const updated = await fetch("/api/events").then((res) => res.json());
    setEvents(updated);
  };

  // Delete
  const handleDelete = async (id) => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    setEvents(events.filter((e) => e._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event Management</h1>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-orange-50 p-4 rounded-lg shadow mb-6 space-y-3"
      >
        <input
          type="text"
          placeholder="Event Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option>Cultural</option>
          <option>Sports</option>
          <option>Academic</option>
          <option>Other</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center"
        >
          <PlusCircle className="mr-2" /> Add Event
        </button>
      </form>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-3">
              <h3 className="font-bold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-xs mt-1 text-gray-500">
                {new Date(event.date).toLocaleDateString()} | {event.category}
              </p>
              <div className="flex justify-between mt-2">
                <button className="text-blue-600 flex items-center text-sm">
                  <Eye className="w-4 h-4 mr-1" /> View
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="text-red-600 flex items-center text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

