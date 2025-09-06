// File: components/layout/Header.jsx (Corrected and Final)

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logOut } from "@/store/slices/authSlice";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import ClientOnly from "../utils/ClientOnly";

const NavLink = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-sky-500"
          : "text-slate-600 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400"
      }`}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="underline"
          className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-sky-500"
        />
      )}
    </Link>
  );
};

const UserAvatar = ({ user }) => (
  <div className="relative h-9 w-9">
    {user.photo_url ? (
      <Image
        src={user.photo_url}
        alt={user.name}
        width={36}
        height={36}
        className="rounded-full object-cover"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
        {user.name?.charAt(0).toUpperCase()}
      </div>
    )}
    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-slate-900" />
  </div>
);

const MenuIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { role, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    setProfileOpen(false);
    router.push("/");
  };

  const isTransparent = pathname === "/" && !isScrolled;

  const headerClasses = isTransparent
    ? "bg-transparent border-transparent"
    : "bg-white/80 backdrop-blur-lg border-slate-200/80 shadow-sm dark:bg-slate-900/80 dark:border-slate-800";

  const textColor = isTransparent
    ? "text-white"
    : "text-slate-800 dark:text-slate-200";

  // THIS LINE IS UPDATED
  const linkColor = isTransparent
    ? "text-slate-200 hover:text-white"
    : "text-slate-700 hover:text-sky-500 dark:text-slate-300 dark:hover:text-sky-400";

  const navLinks =
    role === "PATIENT" ? (
      <>
        <NavLink href="/patient/dashboard">Dashboard</NavLink>
        <NavLink href="/patient/appointments">My Appointments</NavLink>
      </>
    ) : role === "DOCTOR" ? (
      <NavLink href="/doctor/dashboard">Dashboard</NavLink>
    ) : null;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${headerClasses}`}
      >
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <svg
              height="28"
              viewBox="0 0 350 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
              <text
                x="0"
                y="23"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                fontSize="22"
                fontWeight="bold"
                fill={
                  isTransparent
                    ? "url(#logoGradient)"
                    : "var(--primary-color, #0ea5e9)"
                }
                className={
                  isTransparent ? "" : "fill-sky-600 dark:fill-sky-500"
                }
              >
                Doctor Appointment System
              </text>
            </svg>
          </Link>

          <ClientOnly>
            <div className="hidden items-center gap-x-2 md:flex">
              {user && navLinks}
            </div>
          </ClientOnly>

          <div className="flex items-center gap-x-4">
            <ClientOnly>
              <ThemeToggleButton />
              {user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button onClick={() => setProfileOpen((p) => !p)}>
                    <UserAvatar user={user} />
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:ring-slate-700"
                      >
                        <Link
                          href={
                            role === "PATIENT"
                              ? "/patient/profile"
                              : "/doctor/profile"
                          }
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          Your Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden items-center gap-x-4 md:flex">
                  <Link
                    href="/login"
                    className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 transition-colors"
                  >
                    Member Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 transition-colors"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </ClientOnly>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={textColor}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
