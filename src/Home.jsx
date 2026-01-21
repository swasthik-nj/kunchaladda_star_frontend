import React from "react";
import Nav from "./components/Nav";
import SpecialEventPopup from "./components/SpecialEventPopup";
import Footer from "./components/Footer";
import FeaturedMembers from "./components/FeaturedMembers";

export default function Home() {
  return (
    <div className="overflow-y-scroll w-full bg-blue-500">
      <Nav />
      <div className="">
        <img
          src="https://plus.unsplash.com/premium_photo-1701520447608-3ff1bd3314f3?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-0"
          alt=""
          srcset=""
        />
      </div>
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

              <a
                href="#about"
                className="bg-green-700 hover:bg-green-900 text-white font-semibold py-1.5 lg:py-2 px-3 lg:px-6 w-fit rounded-lg text-lg sm:text-xl md:text-xl transition duration-300 join-as"
              >
                Join as a member
              </a>
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

      <div className="relative bg-slate-900 w-full  z-10">
        <div
          id="about"
          className="pt-20 md:pt-10 lg:pt-20 px-4 sm:px-6 md:px-8 lg:px-12"
        >
          <div className="w-full m-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg">
            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
              Our family website is a private digital space created with love,
              respect, and a deep sense of belonging. It is designed to bring
              together every family member — young and old — onto one shared
              platform where memories, values, and relationships can grow
              stronger over time.
              <br />
              <br />
              In a fast-moving world where distance and busy lives often keep us
              apart, this website acts as our virtual home, helping us stay
              connected no matter where we are.
            </p>

            <div
              id="events"
              className="flex flex-col items-center gap-6 mt-8 w-full max-w-6xl m-auto lg:flex-row lg:justify-around pt-5"
            >
              <img
                src=""
                alt="Sakraman Pooja"
                className="w-72 h-72 bg-amber-300 rounded-lg object-cover"
              />

              <div className="text-white w-full max-w-xl text-center lg:text-left">
                <h1 className="text-2xl lg:text-4xl font-semibold mb-3">
                  Sakraman Pooja
                </h1>

                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  A sacred Sakraman Pooja is conducted every month in honor of
                  Swami Koragajja. On this auspicious day, devotees and family
                  members may submit their Harake (vows or offerings) and seek
                  divine blessings. All rituals are performed in accordance with
                  traditional customs, praying for the well-being and prosperity
                  of the family.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-6xl m-auto lg:flex-row lg:justify-around pt-15 md:pt-20">
              <img
                src=""
                alt="Sakraman Pooja"
                className="w-72 h-72 bg-amber-300 rounded-lg object-cover sm:flex lg:hidden"
              />
              <div className="text-white w-full max-w-xl text-center lg:text-left">
                <h1 className="text-2xl lg:text-4xl font-semibold mb-3">
                  Sakraman Pooja
                </h1>

                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  A sacred Sakraman Pooja is conducted every month in honor of
                  Swami Koragajja. On this auspicious day, devotees and family
                  members may submit their Harake (vows or offerings) and seek
                  divine blessings. All rituals are performed in accordance with
                  traditional customs, praying for the well-being and prosperity
                  of the family.
                </p>
              </div>
              <img
                src=""
                alt="Sakraman Pooja"
                className="w-72 h-72 bg-amber-300 rounded-lg object-cover hidden lg:flex"
              />
            </div>
            <SpecialEventPopup />
          </div>
        </div>
      </div>


     
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
        <a href="/members" className="bg-gray-700 px-3.5 py-1.5">All members</a>
        <FeaturedMembers />
      </div>

      <div className="relative">
        <Footer />
      </div>
    </div>
  );
}
