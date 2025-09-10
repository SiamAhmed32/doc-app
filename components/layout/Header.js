"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import ThemeToggleButton from "../ui/ThemeToggleButton";
import Button from "../ui/Button";
import { logOut } from "@/store/slices/authSlice";
import ClientOnly from "../utils/ClientOnly";

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
  const [isBannerVisible, setIsBannerVisible] = useState(true);
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
          isScrolled ? "backdrop-blur bg-black/50" : "backdrop-blur bg-black/20" 
        }`
      : "sticky top-0 w-full z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm";

  return (
    <>
      <header className={headerClasses}>
        <AnimatePresence>
          {isBannerVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-sky-600 text-white overflow-hidden"
            >
              <div className="container mx-auto flex items-center justify-center px-4 py-2 text-sm text-center">
                <span>
                  <strong className="font-semibold">New Feature:</strong>{" "}
                  Telemedicine is now available!
                </span>
                <button
                  onClick={() => setIsBannerVisible(false)}
                  className="ml-4 p-1 rounded-full hover:bg-white/20"
                  aria-label="Dismiss"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="container mx-auto flex h-16 items-center px-4">
          <Link
            href="/"
            className="font-bold text-xl text-sky-400 dark:text-sky-300 tracking-tight"
          >
            DocAppoint
          </Link>
          <div className="hidden md:flex items-center gap-x-2 ml-auto">
            <ClientOnly>
              {user &&
                navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-sky-300 hover:text-sky-200 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              {!user && (
                <>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="text-white border-white"
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
                <div className="relative ml-2" ref={profileMenuRef}>
                  <button
                    onClick={() => setProfileOpen((p) => !p)}
                    aria-label="Open profile menu"
                  >
                    <UserAvatar user={user} />
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 py-2 shadow-2xl ring-1 ring-black/5"
                      >
                        <div className="px-4 py-2 text-sm text-slate-800 dark:text-white border-b dark:border-slate-700">
                          <div className="font-bold">{user.name}</div>
                          <div className="text-xs text-slate-500">{role}</div>
                        </div>
                        <button
                          onClick={() => {
                            dispatch(logOut());
                            router.push("/");
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </ClientOnly>
            <ThemeToggleButton />
          </div>
          <div className="flex md:hidden ml-auto">
            <ClientOnly>
              {user ? (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2"
                  aria-label="Open menu"
                >
                  <UserAvatar user={user} />
                </button>
              ) : (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 text-white"
                  aria-label="Open menu"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
            </ClientOnly>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 right-0 h-full w-full max-w-xs bg-white dark:bg-slate-900 shadow-lg flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg text-black-700 dark:text-white-400">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="font-bold text-lg text-sky-700 dark:text-sky-400"
                >
                  <X />
                </button>
              </div>
              <div className="p-4">
                <ClientOnly>
                  {!user && (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="w-full">Login</Button>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button variant="outline" className="w-full">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                  {user && (
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <Link
                          href={link.href}
                          key={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-medium"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </ClientOnly>
              </div>
              <div className="mt-auto p-4 border-t flex items-center justify-between">
                <ThemeToggleButton />
                <ClientOnly>
                  {user && (
                    <button
                      onClick={() => {
                        dispatch(logOut());
                        router.push("/");
                      }}
                      className="font-medium text-red-600"
                    >
                      Logout
                    </button>
                  )}
                </ClientOnly>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
