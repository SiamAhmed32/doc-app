Doctor Appointment Management System


A modern, responsive, and feature-rich frontend for a doctor-patient appointment management platform. Designed for scalability, performance, and an exceptional user experience.

Live Application: digitaldocappointment.netlify.app ---

Table of Contents
Project Overview

Key Features

Technology Stack

Architectural Highlights

Getting Started

API Information

Project Overview
This application provides a seamless and intuitive interface for both patients and doctors to manage medical appointments. From the immersive, animated hero section to the dynamic, role-aware navigation, every element has been crafted for speed, usability, and a professional user experience.

For Patients: Users can search for healthcare providers by name or specialization, view doctor profiles, book available slots through an interactive modal, and manage their complete appointment history.

For Doctors: A robust dashboard allows providers to view and filter their schedule by date and status, update appointment outcomes, and track their patient interactions in real-time.

The system is built with a mobile-first, responsive design, guaranteeing a crisp and fully functional experience on every device, from mobile phones to desktop computers.

Key Features
General Features
Dynamic Hero Section: An animated, auto-playing slider on the homepage showcasing key features.

Role-Based Access Control: Secure login and registration system for two distinct user roles: Patient and Doctor.

Persistent Sessions: User authentication state is managed with Redux Toolkit and persisted in local storage.

Dynamic Navigation: The header is fully authentication-aware, showing different links and controls based on user role and login status.

Light & Dark Mode: A user-controlled theme toggle for personalized viewing comfort, with the user's preference saved locally.

Real-Time Feedback: Interactive form validation and toast notifications for all critical user actions provide clear and immediate feedback.

Patient Features
Advanced Doctor Search: A comprehensive directory of doctors with real-time, debounced search by name.

Filter by Specialization: A dropdown filter allows patients to easily browse doctors by their medical specialty.

Server-Side Pagination: Efficiently handles a large number of doctors by fetching data page by page.

Skeleton Loading States: Advanced skeleton loaders provide superior perceived performance during data fetching.

Secure Appointment Booking: An intuitive modal with a date picker for streamlined and secure appointment scheduling.

Appointment Management: A dedicated "My Appointments" page where patients can view their schedule, filter by status, and cancel pending appointments.

Doctor Features
Centralized Dashboard: A unified dashboard for doctors to efficiently manage their patient schedule.

Advanced Filtering: Appointments can be filtered by both date and status (Pending, Completed, Cancelled).

Real-Time Status Updates: Doctors can mark appointments as "Completed" or "Cancelled," with changes reflected instantly in the UI.

Technology Stack
Core Framework: Next.js 14+ (App Router)

State Management:

Redux Toolkit: For robust, global client-side state (Authentication).

TanStack React Query v5: For all server state management, including data fetching, caching, and mutations.

React Context: For managing the global UI theme (light/dark mode).

Styling: Tailwind CSS with a mobile-first approach.

Animations: Framer Motion for fluid and meaningful UI animations.

Forms & Validation: React Hook Form with Zod for schema-based, real-time validation.

API Communication: Axios with interceptors for streamlined and authenticated API requests.

UI Components & Libraries:

Headless UI: For building accessible and unstyled components like Modals.

react-toastify: For user-friendly notifications.

react-datepicker: For an intuitive date selection interface.

Swiper.js: For the touch-enabled hero section slider.

Architectural Highlights
Component-Driven: Built with reusable UI blocks (Button, Modal, Card, Input) for design consistency and rapid development.

Separation of Concerns: Custom hooks (useDoctors, useLoginForm) encapsulate business logic, a service layer handles API communication, and components focus solely on rendering the UI.

Efficient Data Layer: Leverages the power of React Query for server-side data caching, automatic refetching, and optimistic updates, leading to a fast and responsive user experience.

Centralized Authentication: A robust session management system powered by Redux allows for secure, persistent logins and role-based access control across the entire application.

Getting Started
To set up and run this project on your local machine, please follow these steps.

Prerequisites
Node.js: v18.x or later

Package Manager: npm, yarn, or pnpm

Local Setup
Clone the repository:

Bash

git clone <YOUR_REPOSITORY_URL>
Navigate to the project directory:

Bash

cd <PROJECT_DIRECTORY>
Install dependencies:

Bash

npm install
Set up environment variables:
Create a file named .env.local in the root of the project and add the necessary environment variables. You can copy the example file:

Bash

cp .env.example .env.local
Then, update the values in .env.local if needed.

Run the development server:

Bash

npm run dev
The application will be available at http://localhost:3000.

API Information
This frontend is pre-configured to work with the live REST API hosted at:
https://appointment-manager-node.onrender.com/api/v1

The base URL is set in the central Axios client configuration located at /lib/axios.js. All authentication, doctor searches, and appointment management actions are routed through this secure, centrally-managed client.