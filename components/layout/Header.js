"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import Button from "../ui/Button";
import { logOut } from "@/store/slices/authSlice";

// Avatar circle with initial or user photo
const UserAvatar = ({ user }) => (
  <div className="relative h-9 w-9">
    {user?.photo_url ? (
      <img
        src={user.photo_url}
        alt={user.name}
        className="rounded-full object-cover h-full w-full"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-sky-600 text-base font-bold text-white">
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </div>
    )}
    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-slate-900" />
  </div>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (pathname === "/") {
      const onScroll = () => setIsScrolled(window.scrollY > 32);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [pathname]);

  // Close mobile menu/profile on outside click
  useEffect(() => {
    const handler = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    ...(role === "PATIENT"
      ? [
          { name: "Find Doctors", href: "/patient/dashboard" },
          { name: "My Appointments", href: "/patient/appointments" },
        ]
      : []),
    ...(role === "DOCTOR"
      ? [{ name: "Appointments", href: "/doctor/dashboard" }]
      : []),
  ];

  const headerClasses =
    pathname === "/"
      ? `fixed top-0 left-0 w-full z-40 transition-all duration-300
        ${
          isScrolled
            ? "backdrop-blur bg-black/50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 shadow"
            : "bg-black/20 dark:bg-black/40"
        }`
      : "sticky top-0 w-full z-40 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shadow";

  return (
    <>
      <header className={headerClasses}>
        <nav className="container mx-auto flex h-16 items-center px-4">
          <Link
            href="/"
            className="font-bold text-xl text-sky-100 dark:text-sky-300 tracking-tight"
          >
            DocAppoint
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-x-4 ml-auto">
            {user &&
              navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className="!text-base font-semibold text-white dark:text-white"
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            {!user && (
              <>
                <Link href="/login">
                  <Button
                    variant={pathname === "/" ? "default" : "outline"}
                    className={
                      pathname === "/"
                        ? "bg-sky-600 text-white"
                        : ""
                    }
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default">Sign Up</Button>
                </Link>
              </>
            )}
            {user && (
              <div className="relative" ref={profileMenuRef}>
                <button
                  className="focus:outline-none ml-2"
                  onClick={() => setProfileOpen((p) => !p)}
                  aria-label="Open user profile menu"
                >
                  <UserAvatar user={user} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-white py-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:ring-slate-700"
                    >
                      <div className="px-4 py-3 text-sm text-slate-800 dark:text-white">
                        <div className="font-bold">{user.name}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-400">
                          {role}
                        </div>
                      </div>
                      <Link
                        href={
                          role === "PATIENT"
                            ? "/patient/profile"
                            : "/doctor/profile"
                        }
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 text-slate-700 hover:bg-sky-50 dark:text-slate-200 dark:hover:bg-slate-900 text-sm"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logOut());
                          setProfileOpen(false);
                          router.push("/");
                        }}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-sky-50 dark:hover:bg-slate-900 text-sm"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <ThemeToggleButton />
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center md:hidden ml-auto">
            <ThemeToggleButton />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="ml-2 p-2 rounded-lg text-sky-100 dark:text-slate-200 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none"
              aria-label="Open menu"
            >
              {/* Hamburger icon */}
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="inline"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile slide panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white/95 dark:bg-slate-900/95 shadow-lg border-l flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-lg text-sky-700 dark:text-sky-400">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full p-2 hover:bg-sky-100 dark:hover:bg-slate-800 focus:outline-none"
                  aria-label="Close menu"
                >
                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="inline"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col px-4 pt-8 gap-4">
                {user &&
                  navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full text-base font-semibold"
                      >
                        {link.name}
                      </Button>
                    </Link>
                  ))}
                {!user && (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full mt-2">
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="default" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
                {user && (
                  <div className="flex flex-col items-start border-t border-slate-200 dark:border-slate-800 mt-4 pt-4 gap-2">
                    <div className="flex items-center gap-2">
                      <UserAvatar user={user} />
                      <span className="font-semibold text-sky-700 dark:text-sky-400">
                        {user.name}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        dispatch(logOut());
                        setMobileMenuOpen(false);
                        router.push("/");
                      }}
                      className="mt-2 text-red-600 text-base"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
