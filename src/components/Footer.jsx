import React from "react";
import { FaInstagram } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-black  w-full text-gray-400 pb-3 pt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">

       
        <div className="flex flex-col md:flex-row md:justify-between">

          <div className="">
            <h3 className="text-white font-bold text-xl mb-4">
              Our Family
            </h3>
            <p className="text-sm mb-4">
              A private digital home to preserve our memories, traditions,
              values, and togetherness across generations.
            </p>
            <div className="flex gap-4">
              <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                ❤️
              </span>
              <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                🌳
              </span>
              <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                📸
              </span>
              <span className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <a href="https://www.instagram.com/cousin_squad199/" target="_blank" className="hover:text-white transition"><FaInstagram/></a>
              </span>
            </div>
          </div>

          <div className="flex gap-16 lg:flex-wrap md:col-span-3 mb-8">
            <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white transition">About Our Family</a></li>
              <li><a href="#tree" className="hover:text-white transition">Family Tree</a></li>
              <li><a href="#events" className="hover:text-white transition">Events & Poojas</a></li>
              <li><a href="#gallery" className="hover:text-white transition mb-4">Photo Gallery</a></li>
            </ul>
            </div>
            <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm ">
              <li> Private & Family Only</li>
              <li> Contact Family Admin</li>
              <li> Built on Trust & Respect</li>
            </ul>
            </div>
          </div>

        </div>

        <div className="border-t  border-gray-800 pt-3 text-center text-sm ">
          <p>
            © {new Date().getFullYear()} Our Family. All memories are preserved
            with love.
          </p>
          <p className="p-2">
            Developed by{" "}
            <a
              href="https://swasthik-nj-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white "
            >
              Swasthik N J
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
