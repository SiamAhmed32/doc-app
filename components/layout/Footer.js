import Link from "next/link";

const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 transition-colors hover:text-sky-500"
  >
    {children}
  </a>
);

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-slate-500 transition-colors hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-400"
  >
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold text-slate-800 dark:text-white"
            >
              Doctor Appointment System
            </Link>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Your trusted partner in managing healthcare appointments.
            </p>
          </div>
          <div className="text-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              For Patients
            </h3>
            <ul className="mt-4 space-y-2">
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
            <h3 className="font-semibold text-slate-900 dark:text-white">
              For Doctors
            </h3>
            <ul className="mt-4 space-y-2">
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
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <FooterLink href="#">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Contact</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Terms of Service</FooterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-100/50 py-4 dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} Doctor Appointment System. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
