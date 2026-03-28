import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Adminnj() {
	const [stats, setStats] = useState({ totalUsers: 0, totalImages: 0, totalEvents: 0 });
	const [users, setUsers] = useState([]);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		title: "",
		description: "",
		eventImage: "",
		eventDate: "",
	});

	const token = localStorage.getItem("accessToken");

	const api = useMemo(
		() =>
			axios.create({
				baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`,
				withCredentials: true,
				headers: {
					Authorization: token ? `Bearer ${token}` : "",
				},
			}),
		[token]
	);

	const loadDashboard = useCallback(async () => {
		try {
			setLoading(true);
			const [statsRes, usersRes, eventsRes] = await Promise.all([
				api.get("/stats"),
				api.get("/users"),
				api.get("/events"),
			]);

			setStats(statsRes.data?.data || { totalUsers: 0, totalImages: 0, totalEvents: 0 });
			setUsers(usersRes.data?.data?.users || []);
			setEvents(eventsRes.data?.data?.events || []);
			setError("");
		} catch (err) {
			console.error("Admin dashboard error:", err);
			setError(err?.response?.data?.message || "Failed to load dashboard data");
		} finally {
			setLoading(false);
		}
	}, [api]);

	useEffect(() => {
		loadDashboard();
	}, [loadDashboard]);

	const onSubmitEvent = async (e) => {
		e.preventDefault();

		if (!form.title || !form.eventDate) {
			setError("Event title and date are required");
			return;
		}

		try {
			setSubmitting(true);
			const response = await api.post("/events", form);
			const createdEvent = response.data?.data?.event;

			if (createdEvent) {
				setEvents((prev) => [...prev, createdEvent].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)));
				setStats((prev) => ({ ...prev, totalEvents: prev.totalEvents + 1 }));
			}

			setForm({ title: "", description: "", eventImage: "", eventDate: "" });
			setError("");
		} catch (err) {
			console.error("Create event error:", err);
			setError(err?.response?.data?.message || "Failed to create event");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-100 text-slate-900">
			<Nav />

			<main className="max-w-7xl mx-auto px-4 pt-28 pb-14 space-y-8">
				<header className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
					<p className="text-xs uppercase tracking-[0.22em] text-slate-500">Admin dashboard</p>
					<h1 className="text-3xl font-bold mt-2">Family Admin Control</h1>
					<p className="text-slate-600 mt-2">See all users, track total images, and add events.</p>
				</header>

				{error && (
					<div className="rounded-xl border border-rose-300 bg-rose-100 px-4 py-3 text-rose-700">
						{error}
					</div>
				)}

				{loading ? (
					<div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-600">Loading dashboard...</div>
				) : (
					<>
						<section className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<article className="bg-white border border-slate-200 rounded-xl p-5">
								<p className="text-slate-500 text-sm">Total users</p>
								<p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
							</article>
							<article className="bg-white border border-slate-200 rounded-xl p-5">
								<p className="text-slate-500 text-sm">Total images</p>
								<p className="text-3xl font-bold mt-2">{stats.totalImages}</p>
							</article>
							<article className="bg-white border border-slate-200 rounded-xl p-5">
								<p className="text-slate-500 text-sm">Total events</p>
								<p className="text-3xl font-bold mt-2">{stats.totalEvents}</p>
							</article>
						</section>

						<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<article className="bg-white border border-slate-200 rounded-2xl p-5">
								<h2 className="text-xl font-semibold">Add event</h2>
								<form className="space-y-3 mt-4" onSubmit={onSubmitEvent}>
									<input
										type="text"
										required
										value={form.title}
										onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
										className="w-full border border-slate-300 rounded-lg px-3 py-2"
										placeholder="Event title"
									/>
									<input
										type="date"
										required
										value={form.eventDate}
										onChange={(e) => setForm((prev) => ({ ...prev, eventDate: e.target.value }))}
										className="w-full border border-slate-300 rounded-lg px-3 py-2"
									/>
									<textarea
										rows={4}
										value={form.description}
										onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
										className="w-full border border-slate-300 rounded-lg px-3 py-2"
										placeholder="Event description"
									/>
									<input
										type="url"
										value={form.eventImage}
										onChange={(e) => setForm((prev) => ({ ...prev, eventImage: e.target.value }))}
										className="w-full border border-slate-300 rounded-lg px-3 py-2"
										placeholder="Event image URL (optional)"
									/>
									<button
										type="submit"
										disabled={submitting}
										className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 disabled:bg-slate-400"
									>
										{submitting ? "Adding..." : "Add event"}
									</button>
								</form>
							</article>

							<article className="bg-white border border-slate-200 rounded-2xl p-5">
								<h2 className="text-xl font-semibold">Events</h2>
								<div className="mt-4 space-y-3 max-h-[420px] overflow-auto pr-1">
									{events.length === 0 ? (
										<p className="text-slate-500">No events added yet</p>
									) : (
										events.map((event) => (
											<div key={event._id} className="rounded-lg border border-slate-200 p-3">
												{event.eventImage && (
													<img
														src={event.eventImage}
														alt={event.title}
														className="w-full h-36 rounded-md object-cover mb-3"
													/>
												)}
												<h3 className="font-semibold">{event.title}</h3>
												<p className="text-sm text-slate-600 mt-1">{event.description || "No description"}</p>
												<p className="text-xs text-slate-500 mt-2">
													{new Date(event.eventDate).toLocaleDateString()} | by {event.createdBy?.fullname || "Admin"}
												</p>
											</div>
										))
									)}
								</div>
							</article>
						</section>

						<section className="bg-white border border-slate-200 rounded-2xl p-5">
							<h2 className="text-xl font-semibold">All users</h2>
							<div className="mt-4 overflow-x-auto">
								<table className="min-w-full text-sm">
									<thead>
										<tr className="text-left text-slate-500 border-b border-slate-200">
											<th className="py-2 pr-4">Name</th>
											<th className="py-2 pr-4">Email</th>
											<th className="py-2 pr-4">Verified</th>
											<th className="py-2 pr-4">Joined</th>
										</tr>
									</thead>
									<tbody>
										{users.map((u) => (
											<tr key={u._id} className="border-b border-slate-100">
												<td className="py-2 pr-4 capitalize">{u.fullname}</td>
												<td className="py-2 pr-4">{u.email}</td>
												<td className="py-2 pr-4">{u.isEmailVarified ? "Yes" : "No"}</td>
												<td className="py-2 pr-4">{new Date(u.createdAt).toLocaleDateString()}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</section>
					</>
				)}
			</main>

			<Footer />
		</div>
	);
}
