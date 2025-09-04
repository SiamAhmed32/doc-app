"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logOut } from "@/store/slices/authSlice";
import ThemeToggleButton from "../ui/ThemeToggleButton";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
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
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

const UserAvatar = ({ user }) => (
  <div className="relative h-9 w-9">
    {user.photo_url ? (
      <img
        src={user.photo_url}
        alt={user.name}
        className="h-full w-full rounded-full object-cover"
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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { role, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-900/10 bg-white/80 backdrop-blur-lg dark:border-slate-300/10 dark:bg-slate-900/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold text-slate-800 dark:text-white"
        >
          Doctor Appointment <span className="text-sky-500"> System</span>
        </Link>

        <div className="hidden items-center gap-x-2 md:flex">{navLinks}</div>

        <div className="flex items-center gap-x-4">
          <ThemeToggleButton />
          {user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="rounded-full transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                <UserAvatar user={user} />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:ring-white dark:ring-opacity-10"
                  >
                    <div className="border-b border-slate-200 px-3 py-2 dark:border-slate-700">
                      <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                        {user.name}
                      </p>
                      <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-x-2 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-slate-100 dark:text-red-500 dark:hover:bg-slate-700"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex">
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-700 hover:text-sky-500 dark:text-slate-200 dark:hover:text-sky-400"
              >
                Login
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-700 dark:text-slate-200">
                  Menu
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
              <div
                className="mt-8 flex flex-col items-start space-y-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                {navLinks}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
