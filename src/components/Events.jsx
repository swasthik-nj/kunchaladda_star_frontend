import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

const mainEvents = [
  {
    id: "main-1",
    title: "Sakraman Pooja",
    description:
      "A sacred monthly pooja in honor of Swami Koragajja. Family members offer Harake and seek blessings.",
    image:
      "./koragajja.jpeg",
  },
  {
    id: "main-2",
    title: "Family Gatherings",
    description:
      "A shared place to celebrate milestones, announce occasions, and preserve family stories for future generations.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },

];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/events`);
        setEvents(response.data?.data?.events || []);
        setError("");
      } catch (err) {
        console.error("Fetch events error:", err);
        setError("Failed to load admin events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-y-auto bg-slate-50"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/236x/e8/7a/ee/e87aee069ed2f80d932cea4f17d669e0.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          backgroundPosition: "top left",
        }}>
      <Nav />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-14 space-y-10"id="about">
        <header className="bg-orange-100/40 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Events</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Family Events</h1>
          <p className="text-slate-600 mt-2">Main events and newly added events from admin are listed here.</p>
        </header>

        <section className="space-y-4 max-w-4xl flex flex-col justify-center m-auto " >
          <h2 className="text-2xl font-semibold">Main Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainEvents.map((event) => (
              <article key={event.id} className="bg-orange-100/40 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <img src={event.image} alt={event.title} className="w-full h-70 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-slate-600 mt-2">{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Admin Added Events</h2>

          {loading ? (
            <div className="bg-orange-100/40 border border-slate-200 rounded-2xl p-6 text-slate-600">Loading events...</div>
          ) : error ? (
            <div className="bg-rose-100 border border-rose-300 rounded-2xl p-6 text-rose-700">{error}</div>
          ) : events.length === 0 ? (
            <div className="bg-orange-100/40 border border-slate-200 rounded-2xl p-6 text-slate-600">No admin events added yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  {event.eventImage ? (
                    <img src={event.eventImage} alt={event.title} className="w-full h-56 object-cover" />
                  ) : (
                    <div className="w-full h-56 bg-slate-200 flex items-center justify-center text-slate-500">No image</div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-slate-600 mt-2">{event.description || "No description"}</p>
                    <p className="text-sm text-slate-500 mt-3">
                      {new Date(event.eventDate).toLocaleDateString()} | by {event.createdBy?.fullname || "Admin"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <h3 className="text-lg md:text-xl font-semibold">{selectedEvent.title}</h3>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-slate-500 hover:text-slate-800 text-2xl leading-none"
                aria-label="Close event popup"
              >
                ×
              </button>
            </div>

            {selectedEvent.eventImage ? (
              <div className="w-full max-h-[75vh] bg-slate-950/90 p-3 flex items-center justify-center">
                <img
                  src={selectedEvent.eventImage}
                  alt={selectedEvent.title}
                  className="w-full max-h-[72vh] object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-72 bg-slate-200 flex items-center justify-center text-slate-500">No image</div>
            )}

            <div className="px-5 py-4 space-y-2">
              <p className="text-slate-600">{selectedEvent.description || "No description"}</p>
              <p className="text-sm text-slate-500">
                {new Date(selectedEvent.eventDate).toLocaleDateString()} | by {selectedEvent.createdBy?.fullname || "Admin"}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
