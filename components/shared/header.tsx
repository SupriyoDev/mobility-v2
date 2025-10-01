"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car, LogOut, Menu, UserIcon, Wallet, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const navigationItems = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Locations", url: "/locations" },
  { name: "Contact", url: "/contact" },
  { name: "Terms", url: "/terms" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const loading = false;
  // const userData = {
  //   name: "supriya maji",
  // };
  const userData = null;

  const { isAuthenticated, user } = useKindeBrowserClient();

  const handleLogout = async () => {};

  // Show user info only after hydration and mounting

  return (
    <header className="bg-gray-900 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={"/"} className="flex items-center space-x-3">
            <Image
              src={"/logo-white.png"}
              alt="Mobility Scooters Logo"
              width={200}
              height={200}
              className="size-16"
            />
            <div className="flex flex-col ml-4">
              <span className="text-xl md:block hidden font-bold bg-gradient-to-r to-bgtertiary from-bgsecondary bg-clip-text text-transparent">
                Mobility Scooters
              </span>
              <span className="text-xs md:block hidden text-white -mt-1">
                Bringing comfort to every step
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className={`from-accent font-normal text-lg transition-colors hover:text-bgsecondary ${
                  pathname === item.url
                    ? "text-bgtertiary border-b-2 border-bgtertiary pb-1"
                    : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Loading state - show minimal UI */}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* User dropdown when logged in */}
            {isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 border-blue-200 hover:border-blue-300"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>{user.given_name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={"/dashboard"} className="flex items-center">
                      <Wallet className="w-4 h-4 mr-2" />
                      My Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={"/bookings"} className="flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <LogoutLink>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </LogoutLink>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Login/Signup buttons when not logged in */}
            {!user && (
              <div className="flex flex-row items-center gap-2">
                <RegisterLink>
                  <Button
                    size={"lg"}
                    className="border-white border-2 text-base text-white hover:text-bgsecondary hover:border-bgtertiary shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    SignUp
                  </Button>
                </RegisterLink>
                <LoginLink>
                  <Button
                    size={"lg"}
                    className="bg-bgsecondary text-base text-gray-900 hover:bg-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Login
                  </Button>
                </LoginLink>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                  pathname === item.url
                    ? "bg-bgtertiary/10 text-bgtertiary"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile user menu */}
            {userData && (
              <div className="border-t pt-2 mt-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  My Dashboard
                </Link>
                <Link
                  href="/bookings"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  My Bookings
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
