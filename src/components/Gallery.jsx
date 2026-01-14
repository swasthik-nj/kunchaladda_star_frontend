import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";
import Footer from "./Footer";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    fetchAllImages();
    initCloudinaryWidget();
  }, []);

  const initCloudinaryWidget = () => {
    if (window.cloudinary) {
      setWidgetReady(true);
      return;
    }

    // Reuse an existing script tag if it was already injected (e.g., hot reload)
    const existing = document.querySelector('script[data-cloudinary="upload-widget"]');
    if (existing) {
      if (window.cloudinary) {
        setWidgetReady(true);
        return;
      }

      if (existing.readyState === "complete") {
        setWidgetReady(true);
        return;
      }

      existing.addEventListener("load", () => setWidgetReady(true), { once: true });
      existing.addEventListener("error", () => setError("Could not load the Cloudinary widget. Check your network and try again."), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.dataset.cloudinary = "upload-widget";
    script.onload = () => setWidgetReady(true);
    script.onerror = () => setError("Could not load the Cloudinary widget. Check your network and try again.");
    document.body.appendChild(script);
  };

  const fetchAllImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/v1/gallery/all");
      setImages(response.data.data.images || []);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setError("Missing Cloudinary config. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env.");
      return;
    }

    if (!widgetReady || !window.cloudinary) {
      setError("Cloudinary widget is still loading. Please wait a moment and try again.");
      return;
    }

    const cloudinary = window.cloudinary;
    cloudinary.openUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET, 
        sources: ["local", "url", "camera"],
        maxFiles: 1,
      },
      async (error, result) => {
        if (error) {
          console.error("Upload error:", error);
          setError("Upload failed. Please try again.");
          return;
        }

        if (result && result.event === "success") {
          setUploading(true);
          try {
            const { secure_url, public_id, width, height } = result.info;

            const response = await axios.post(
              "http://localhost:3001/api/v1/gallery/upload",
              {
                cloudinaryUrl: secure_url,
                cloudinaryPublicId: public_id,
                title: "Photo",
                description: "",
                width,
                height,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                withCredentials: true,
              }
            );

            setImages([response.data.data.image, ...images]);
            setError("");
          } catch (err) {
            console.error("Error saving image:", err);
            setError("Failed to save image to gallery.");
          } finally {
            setUploading(false);
          }
        }
      }
    );
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/v1/gallery/delete/${imageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });

      setImages(images.filter((img) => img._id !== imageId));
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,#1e3a8a_0,#0f172a_35%,transparent_55%)]" aria-hidden />
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_80%_0%,#7c3aed_0,#0f172a_35%,transparent_55%)]" aria-hidden />

        <div className="w-full max-w-6xl mx-auto px-4 pt-12 pb-8 relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-200 mb-3">Family keepsakes</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-3">
                Curate your brightest moments
              </h1>
              <p className="text-indigo-100 max-w-2xl">
                Drop in new photos, celebrate milestones, and keep the family story vivid. Uploads land instantly and stay in sync for everyone.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                  <FiUploadCloud size={18} />
                </div>
                <div>
                  <p className="text-sm text-indigo-100">Live sync</p>
                  <p className="text-lg font-semibold">Share in seconds</p>
                </div>
              </div>
              <button
                onClick={handleUploadClick}
                disabled={uploading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2"
              >
                <FiUploadCloud size={18} />
                {uploading ? "Uploading..." : "Add a photo"}
              </button>
              <p className="text-xs text-indigo-100/80">
                Tip: Best results with clear subjects and bright lighting. Cloudinary handles resizing automatically.
              </p>
              {error && (
                <div className="text-sm text-rose-100 bg-rose-500/10 border border-rose-400/40 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 pb-12">
        {/* Images Gallery */}
        {loading ? (
          <div className="text-center py-14">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-300"></div>
            <p className="text-indigo-100 mt-4">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-indigo-100 text-lg">No photos yet. Be the first to upload!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-indigo-100/80 px-1">
              <span>{images.length} {images.length === 1 ? "photo" : "photos"}</span>
              <button
                onClick={fetchAllImages}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
              >
                Refresh
              </button>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {images.map((image) => (
                <div
                  key={image._id}
                  className="relative mb-4 break-inside-avoid rounded-xl overflow-hidden bg-slate-900/60 border border-white/5 shadow-xl shadow-slate-900/40"
                  style={{ breakInside: "avoid" }}
                >
                  <img
                    src={image.cloudinaryUrl}
                    alt={image.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent opacity-0 hover:opacity-100 transition duration-200" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-white font-semibold text-sm">
                        {image.uploadedBy?.fullname || "Anonymous"}
                      </p>
                      <p className="text-indigo-100 text-xs">
                        {new Date(image.uploadDate).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteImage(image._id)}
                      className="bg-rose-500/80 hover:bg-rose-500 text-white p-2 rounded-full shadow-lg shadow-rose-900/40 transition"
                      title="Delete image"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
