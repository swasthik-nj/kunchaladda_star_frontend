import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import SpecialEventPopup from "./components/SpecialEventPopup";
import Footer from "./components/Footer";
import FeaturedMembers from "./components/FeaturedMembers";


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateLoginState = () => {
      const hasUser = !!localStorage.getItem("user");
      const hasToken = !!localStorage.getItem("accessToken");
      setIsLoggedIn(hasUser || hasToken);
    };

    updateLoginState();
    window.addEventListener("storage", updateLoginState);
    window.addEventListener("userUpdated", updateLoginState);

    return () => {
      window.removeEventListener("storage", updateLoginState);
      window.removeEventListener("userUpdated", updateLoginState);
    };
  }, []);

  return (
    <div className="relative overflow-y-scroll w-full">
      <Nav />
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/236x/e8/7a/ee/e87aee069ed2f80d932cea4f17d669e0.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
          backgroundPosition: "top left",
        }}
      />
      <div className="relative z-10">
      <div>
        <div className="relative bg-blue-700/40 w-full h-screen flex justify-around items-center z-10 lg:pt-20">
          <div className="  flex flex-col justify-center w-[150vh]  px-4 sm:px-6 md:px-8 lg:px-12 z-10 lg:ml-20 ">
            <h1 className="text-white text-[50px]  sm:text-xl md:text-6xl lg:text-7xl font-bold mb-4 ">
              Welcome to Kunchaladda Star
            </h1>
            <p className="text-gray-900 text-[20px] font-bold sm:text-xl md:text-2xl lg:text-xl mb-8">
              Capturing Moments, Creating Memories
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 mt-10">
              <a
                href="#about"
                className="bg-teal-600 hover:bg-yellow-700 text-white font-semibold py-1.5 lg:py-2 px-3 lg:px-6 w-fit rounded-lg text-lg sm:text-xl md:text-xl transition duration-300"
              >
                Learn More
              </a>

              {isLoggedIn ? (
                <a
                  href="/members"
                  className="bg-indigo-700 hover:bg-indigo-900 text-white font-semibold py-1.5 lg:py-2 px-3 lg:px-6 w-fit rounded-lg text-lg sm:text-xl md:text-xl transition duration-300"
                >
                  View Members
                </a>
              ) : (
                <a
                  href="/register"
                  className="bg-green-700 hover:bg-green-900 text-white font-semibold py-1.5 lg:py-2 px-3 lg:px-6 w-fit rounded-lg text-lg sm:text-xl md:text-xl transition duration-300 join-as"
                >
                  Join as a member
                </a>
              )}
            </div>
          </div>
          <div className="mr-15 hidden md:flex">
            <img
              src="https://i.pinimg.com/736x/41/cd/63/41cd6368d0c7c9cbac052869e0899fd4.jpg"
              className="w-[120vh]  rounded-2xl"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </div>

      <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 bg-gradient-to-b from-slate-950/95 via-slate-900 to-slate-950">
        <div
          id="about"
          className="max-w-6xl mx-auto rounded-3xl border p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
        >
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div>
              <p className="text-amber-300 uppercase tracking-[0.25em] text-xs md:text-sm mb-3">
                About Our Family Space
              </p>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                A digital home that keeps every generation connected
              </h2>
              <p className="text-slate-200/90 text-sm sm:text-base md:text-lg leading-relaxed mt-5">
                Our family website is a private place built with love, respect,
                and a strong sense of belonging. It brings together every family
                member, from elders to children, in one shared space where
                stories, values, and relationships can grow stronger.
              </p>
              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mt-4">
                Even when life gets busy and distance separates us, this platform
                helps us stay close, celebrate traditions, and support one
                another from anywhere in the world.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl bg-emerald-500/15 border border-emerald-300/30 p-4">
                <p className="text-2xl md:text-3xl font-bold text-emerald-200">100+</p>
                <p className="text-xs md:text-sm text-emerald-100/80 mt-1">Years of shared traditions</p>
              </div>
              <div className="rounded-2xl bg-amber-400/15 border border-amber-300/30 p-4">
                <p className="text-2xl md:text-3xl font-bold text-amber-100">100%</p>
                <p className="text-xs md:text-sm text-amber-100/80 mt-1">Family-first community</p>
              </div>
              <div className="rounded-2xl bg-cyan-400/15 border border-cyan-300/30 p-4 col-span-2">
                <p className="text-lg md:text-xl font-semibold text-cyan-100">One space for memories, events, and blessings</p>
              </div>
            </div>
          </div>

          <div id="events" className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="group rounded-2xl overflow-hidden border border-white/10 bg-slate-900/70 hover:border-amber-300/40 transition-colors duration-300">
              <img
                src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop"
                alt="Sakraman Pooja"
                className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-white">Sakraman Pooja</h3>
                <p className="text-slate-300 mt-3 leading-relaxed">
                  A sacred monthly pooja in honor of Swami Koragajja. Family
                  members can offer Harake and receive blessings for health,
                  harmony, and prosperity through rituals rooted in tradition.
                </p>
              </div>
            </article>

            <article className="group rounded-2xl overflow-hidden border border-white/10 bg-slate-900/70 hover:border-emerald-300/40 transition-colors duration-300">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
                alt="Family gatherings"
                className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-white">Family Gatherings</h3>
                <p className="text-slate-300 mt-3 leading-relaxed">
                  A shared place to announce events, celebrate milestones, and
                  preserve stories from every branch of the family for future
                  generations to remember and cherish.
                </p>
              </div>
            </article>
          </div>

          <SpecialEventPopup />
        </div>
      </section>


     
      <div class="max-w-[180vh] mx-auto p-8  z-10 ">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="relative grid grid-cols-30 grid-rows-30 h-[300px] md:h-[550px]">
            <div class="col-start-20 col-end-31 row-start-1 row-end-11">
              <img
                src="https://images.unsplash.com/photo-1768311172651-9f0a3a1d4a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                alt="Interior"
                class="w-full h-full object-cover rounded-2xl shadow-sm"
              />
            </div>

            <div class="col-start-1 col-end-19 row-start-1 row-end-25">
              <img
                src="https://images.unsplash.com/photo-1768311172651-9f0a3a1d4a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                alt="Sofa"
                class="w-full h-full object-cover rounded-tl-[5rem] rounded-bl-2xl rounded-tr-[5rem] rounded-br-2xl"
              />
            </div>

            <div class="col-start-15 col-end-31 row-start-12 row-end-31 z-10">
              <div class="w-full h-full bg-[#a3c2d6] rounded-[3rem]  overflow-hidden shadow-2xl flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1768311172651-9f0a3a1d4a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                  alt="Stool"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-6 z-2">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Experience the Serene Soul of Kunchaladda
            </h2>

            <p class="text-gray-500 text-lg leading-relaxed">
              Nestled in the lush heart of coastal Karnataka, Kunchaladda is a
              testament to nature's untouched beauty. From the rhythmic whispers
              of the Western Ghats to the deep-rooted traditions of the Tulunadu
              landscape, it offers a peaceful escape from the digital hustle.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div class="flex items-start gap-3">
                <span class="mt-1.5 w-2.5 h-2.5 rounded-full border-2 border-green-500 shrink-0"></span>
                <span class="text-gray-600">
                  Emerald canopy of native evergreen forests
                </span>
              </div>
              <div class="flex items-start gap-3">
                <span class="mt-1.5 w-2.5 h-2.5 rounded-full border-2 border-green-500 shrink-0"></span>
                <span class="text-gray-600">
                  Traditional "Daivaneleyas" and spiritual heritage
                </span>
              </div>
              <div class="flex items-start gap-3">
                <span class="mt-1.5 w-2.5 h-2.5 rounded-full border-2 border-green-500 shrink-0"></span>
                <span class="text-gray-600">
                  Scenic views of the rolling Kumaradhara valley
                </span>
              </div>
              <div class="flex items-start gap-3">
                <span class="mt-1.5 w-2.5 h-2.5 rounded-full border-2 border-green-500 shrink-0"></span>
                <span class="text-gray-600">
                  Cherished spaces for multi-generational gatherings and cultural storytelling
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="members h-full relative ">
        <a href="/members" className="bg-orange-300 px-3.5 py-1.5 mx-40">All members</a>
        <FeaturedMembers />
      </div>

      <div className="relative">
        <Footer />
      </div>
      </div>
    </div>
  );
}
