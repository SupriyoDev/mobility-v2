import { Car, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const navigationItems = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Locations", url: "/locations" },
  { name: "Contact", url: "/contact" },
  { name: "Terms", url: "/terms" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={"/logo-white.png"}
                alt=""
                width={100}
                height={100}
                className="size-18"
              />
              <span className="text-2xl font-bold ml-2">
                Mobility UAE Scooters
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Bringing comfort to every step!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +971-4-3974487
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Profile@adventurestaruae.com
              </div>
              <div className="flex items-center">
                <MapPin className="w-8 h-8 mr-2" />
                Al Jaddaf Dry Docks, Unit #35, Dubai, UAE, P.O. Box: 16881
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Mobility UAE Scooters . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
