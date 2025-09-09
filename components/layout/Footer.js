"use client";

import Link from "next/link";

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
  >
    {children}
  </Link>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-5">

          {/* Brand and Description */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight block mb-3"
            >
              DocAppoint
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
              Connecting patients with trusted doctors for seamless, modern healthcare bookings. Your health, simplified.
            </p>
          </div>

          {/* For Patients */}
          <div className="text-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4">For Patients</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/patient/dashboard">Find a Doctor</FooterLink>
              </li>
              <li>
                <FooterLink href="/patient/appointments">My Appointments</FooterLink>
              </li>
              <li>
                <FooterLink href="/register">Register</FooterLink>
              </li>
            </ul>
          </div>

          {/* For Doctors */}
          <div className="text-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4">For Doctors</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/doctor/dashboard">Dashboard</FooterLink>
              </li>
              <li>
                <FooterLink href="/register">Join Our Network</FooterLink>
              </li>
              <li>
                <FooterLink href="/login">Doctor Login</FooterLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">Terms of Service</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="mt-12 mb-6 border-t border-slate-200 dark:border-slate-800" />

        {/* Copyright */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; {currentYear} DocAppoint. All rights reserved.
        </p>
      </div>
    </footer>
  );
}