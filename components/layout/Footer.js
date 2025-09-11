"use client";

import Link from "next/link";

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-slate-300 transition-colors hover:text-white"
  >
    {children}
  </Link>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-white pt-24 pb-12 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-80">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMax slice"
          className="w-full h-full"
        >
          <defs>
            <path
              id="wave"
              fill="rgba(56, 189, 248, 0.2)" 
              d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
              s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
            />
          </defs>
          <g>
            <use href="#wave" opacity=".4">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="8s"
                calcMode="spline"
                values="270 230; -334 180; 270 230"
                keyTimes="0; .5; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" opacity=".6">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="6s"
                calcMode="spline"
                values="-270 230;243 220;-270 230"
                keyTimes="0; .6; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use href="#wave" opacity=".9">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="4s"
                calcMode="spline"
                values="0 230;-140 200;0 230"
                keyTimes="0; .4; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-extrabold text-sky-300 tracking-tight block mb-3"
            >
              DocAppoint
            </Link>
            <p className="text-sm text-slate-300 max-w-sm">
              Connecting patients with trusted doctors for seamless, modern
              healthcare bookings. Your health, simplified.
            </p>
          </div>

          <div className="text-sm">
            <h3 className="font-bold text-lg text-white mb-4">For Patients</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/patient/dashboard">Find a Doctor</FooterLink>
              </li>
              <li>
                <FooterLink href="/patient/appointments">
                  My Appointments
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/register">Register</FooterLink>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <h3 className="font-bold text-lg text-white mb-4">For Doctors</h3>
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

          <div className="text-sm">
            <h3 className="font-bold text-lg text-white mb-4">Company</h3>
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

        <div className="mt-12 border-t border-slate-700 pt-6" />

        <p className="text-center text-sm text-slate-400">
          &copy; {currentYear} DocAppoint. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
