import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDownload, FiTrash2, FiUploadCloud } from "react-icons/fi";
import Footer from "./Footer";
import Nav from "./Nav";
import Loader from "./Loader";

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
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/gallery/all`);
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

    setUploading(true);

    const cloudinary = window.cloudinary;
    const uploadWidget = cloudinary.createUploadWidget(
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
          setUploading(false);
          return;
        }

        if (result && result.event === "close") {
          setUploading(false);
          return;
        }

        if (result && result.event === "success") {
          try {
            const { secure_url, public_id, width, height } = result.info;

            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/gallery/upload`,
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

            setImages((prev) => [response.data.data.image, ...prev]);
            setError("");
            

            setTimeout(() => {
              uploadWidget.close();
            }, 1000);
          } catch (err) {
            console.error("Error saving image:", err);
            setError("Failed to save image to gallery.plss register and login again.");
          } finally {
            setUploading(false);
          }
        }
      }
    );
    
    uploadWidget.open();
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/gallery/delete/${imageId}`, {
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

  const getDownloadFileName = (image) => {
    const baseFromPublicId = image.cloudinaryPublicId?.split("/").pop();
    const safeBase = (baseFromPublicId || image.title || "gallery-image")
      .toString()
      .trim()
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    return `${safeBase || "gallery-image"}.jpg`;
  };

  const handleDownloadImage = async (image) => {
    try {
      const response = await axios.get(image.cloudinaryUrl, { responseType: "blob" });
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = getDownloadFileName(image);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Error downloading image:", err);
      setError("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-y-auto bg-slate-50"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/236x/e8/7a/ee/e87aee069ed2f80d932cea4f17d669e0.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          backgroundPosition: "top left",
        }}>
      {uploading && <Loader />}
      <Nav />
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#818cf8_0,#f5f3ff_35%,transparent_55%)]" aria-hidden />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_80%_0%,#a78bfa_0,#f5f3ff_35%,transparent_55%)]" aria-hidden />

        <div className="w-full max-w-6xl mx-auto px-4 pt-12 pb-8 relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-black mb-3">Family keepsakes</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-3 text-slate-900">
                Curate your brightest moments
              </h1>
              <p className="text-slate-700 max-w-2xl">
                Drop in new photos, celebrate milestones, and keep the family story vivid. Uploads land instantly and stay in sync for everyone.
              </p>
            </div>

            <div className="bg-gray-100 border border-slate-200 backdrop-blur-lg rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                  <FiUploadCloud size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Live sync</p>
                  <p className="text-lg font-semibold text-slate-900">Share in seconds</p>
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
              
              {error && (
                <div className="text-sm text-rose-800 bg-rose-100 border border-rose-300 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 pb-12">

        {loading ? (
          <div className="text-center py-14">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            <p className="text-slate-700 mt-4">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-slate-100 border border-slate-200 rounded-2xl">
            <p className="text-slate-700 text-lg">No photos yet. Be the first to upload!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-black font-semibold px-1">
              <span>{images.length} {images.length === 1 ? "photo" : "photos"}</span>
              <button
                onClick={fetchAllImages}
                className="px-3 py-1.5 rounded-lg text-white bg-black border hover:bg-gray-700 border-slate-200  transition"
              >
                Refresh
              </button>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {images.map((image) => (
                <div
                  key={image._id}
                  className="relative mb-4 break-inside-avoid rounded-xl overflow-hidden bg-white border border-slate-200 shadow-lg shadow-slate-200/40"
                  style={{ breakInside: "avoid" }}
                >
                  <img
                    src={image.cloudinaryUrl}
                    alt={image.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-800/5 to-transparent opacity-0 hover:opacity-100 transition duration-200" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-white font-semibold text-sm drop-shadow-md">
                        {image.uploadedBy?.fullname || "Anonymous"}
                      </p>
                      <p className="text-white text-xs drop-shadow-md">
                        {new Date(image.uploadDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadImage(image)}
                        className="bg-cyan-500/80 hover:bg-cyan-500 text-white p-2 rounded-full shadow-lg shadow-cyan-900/40 transition"
                        title="Download image"
                      >
                        <FiDownload size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image._id)}
                        className="bg-rose-500/80 hover:bg-rose-500 text-white p-2 rounded-full shadow-lg shadow-rose-900/40 transition"
                        title="Delete image"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
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
