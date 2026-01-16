import React, { useEffect, useState } from "react";
import axios from "axios";

// Popup to view profile details and change avatar
export default function ProfilePopup({ user, isOpen, onClose, onProfileUpdate }) {
	const [previewImage, setPreviewImage] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	// Update preview when user or popup opens
	useEffect(() => {
		if (isOpen && user) {
			const avatarUrl = user?.avatar?.url || user?.avatar || "https://placehold.co/120x120";
			setPreviewImage(avatarUrl);
			setSelectedFile(null);
		}
	}, [isOpen, user]);

	const resetState = () => {
		setSelectedFile(null);
		const avatarUrl = user?.avatar?.url || user?.avatar || "https://placehold.co/120x120";
		setPreviewImage(avatarUrl);
		setError(null);
		setSuccess(null);
	};

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setSelectedFile(file);
		const reader = new FileReader();
		reader.onloadend = () => setPreviewImage(reader.result);
		reader.readAsDataURL(file);
		setError(null);
	};

	const handleUploadPhoto = async () => {
		if (!selectedFile) {
			setError("Please select an image first");
			return;
		}

		setLoading(true);
		setError(null);
		setSuccess(null);

		try {
			const accessToken = localStorage.getItem("accessToken");
			if (!accessToken) {
				setError("No authentication token found. Please login again.");
				setLoading(false);
				return;
			}

			// Create FormData and append the file
			const formData = new FormData();
			formData.append("avatar", selectedFile);

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/change-avatar`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					withCredentials: true,
				}
			);

			if (response?.data?.statusCode === 200) {
				const updatedUser = response.data.data.user;
				console.log('Avatar update response:', updatedUser);
				
				// Update localStorage immediately
				localStorage.setItem("user", JSON.stringify(updatedUser));
				
				// Update preview to show new avatar
				const newAvatarUrl = updatedUser.avatar?.url || updatedUser.avatar;
				setPreviewImage(newAvatarUrl);
				
				setSuccess("Profile photo updated successfully");
				
				// Dispatch custom event for same-tab updates (for components like Nav)
				window.dispatchEvent(new CustomEvent('userUpdated', { detail: { user: updatedUser } }));
				
				// Notify parent component with the new user data
				if (onProfileUpdate) onProfileUpdate(updatedUser);
				
				setTimeout(() => {
					resetState();
					onClose();
				}, 800);
			} else {
				setError(response?.data?.message || "Failed to update profile photo");
			}
		} catch (err) {
			const errorMessage = err.response?.data?.message || err.message || "Failed to update profile photo";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 animate-fadeIn">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
					<button
						onClick={() => {
							resetState();
							onClose();
						}}
						className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
						aria-label="Close profile popup"
					>
						×
					</button>
				</div>

				<div className="space-y-4 mb-6">
					<div className="flex flex-col items-center mb-6">
						<img
							key={previewImage}
							src={previewImage || "https://placehold.co/120x120"}
							alt={user?.fullname}
							className="w-24 h-24 rounded-full object-cover border-4 border-amber-700 mb-4"
							onError={(e) => {
								e.target.src = "https://placehold.co/120x120";
							}}
						/>
						<div className="text-center">
							<h3 className="text-lg font-semibold text-gray-800">{user?.fullname || "User"}</h3>
							<p className="text-gray-600 text-sm">{user?.email || "No email"}</p>
						</div>
					</div>

					<div className="bg-gray-50 rounded-lg p-4 space-y-3">
						<div className="flex justify-between">
							<span className="text-gray-600 font-medium">Full Name:</span>
							<span className="text-gray-800">{user?.fullname || "N/A"}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600 font-medium">Email:</span>
							<span className="text-gray-800 text-sm">{user?.email || "N/A"}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600 font-medium">Date of Birth:</span>
							<span className="text-gray-800">{user?.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600 font-medium">Status:</span>
							<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Active</span>
						</div>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded" role="alert">
							{error}
						</div>
					)}

					{success && (
						<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded" role="status">
							{success}
						</div>
					)}

					<div className="border-2 border-dashed border-amber-700 rounded-lg p-4 text-center">
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="hidden"
							id="avatar-input"
							disabled={loading}
						/>
						<label htmlFor="avatar-input" className="cursor-pointer">
							<div className="text-gray-600">
								<p className="text-sm font-medium mb-2">Choose a new profile photo</p>
								<p className="text-xs text-gray-500">Click to select image</p>
							</div>
						</label>
						{selectedFile && (
							<p className="text-xs text-amber-700 font-medium mt-2">✓ {selectedFile.name} selected</p>
						)}
					</div>
				</div>

				<div className="flex gap-3">
					<button
						onClick={() => {
							resetState();
							onClose();
						}}
						className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
						disabled={loading}
					>
						Cancel
					</button>
					<button
						onClick={handleUploadPhoto}
						className="flex-1 px-4 py-2 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={loading || !selectedFile}
					>
						{loading ? "Updating..." : "Update Photo"}
					</button>
				</div>
			</div>

			<style>{`
				@keyframes fadeIn {
					from { opacity: 0; transform: scale(0.95); }
					to { opacity: 1; transform: scale(1); }
				}
				.animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
			`}</style>
		</div>
	);
}
