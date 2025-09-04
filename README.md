Doctor Appointment Management System
A modern, responsive, and feature-rich frontend for a doctor-patient appointment management platform. This project is built with a professional-grade technology stack and is designed for scalability, performance, and an exceptional user experience.

Live Application URL: digitalhealthcare.netlify.app

Table of Contents
Project Overview

Key Features

Technology Stack

Getting Started

Architectural Highlights

API Information

Project Overview
This application provides a seamless interface for both patients and doctors to manage medical appointments. Patients can search for healthcare providers by name or specialization, book available slots, and manage their upcoming and past appointments. Doctors are provided with a dedicated dashboard to view their schedule, filter appointments by date and status, and update appointment outcomes in real-time.

The system is built with a mobile-first, responsive design, ensuring full functionality and an optimal viewing experience across all devices, from mobile phones to desktop computers.

Key Features
General Features
Role-Based Authentication: Secure login and registration system for two distinct user roles: Patient and Doctor.

Persistent Sessions: User authentication state is persisted in local storage, providing a seamless experience across browser sessions.

Light & Dark Mode: A user-controlled theme toggle for personalized viewing comfort, with the user's preference saved locally.

Responsive Design: The entire application is fully responsive and optimized for a wide range of screen sizes.

User Feedback: Real-time form validation and toast notifications for all critical user actions provide clear and immediate feedback.

Patient Features
Advanced Doctor Search: A comprehensive directory of doctors with real-time, debounced search by name.

Filter by Specialization: A dropdown filter allows patients to easily browse doctors by their medical specialty.

Server-Side Pagination: Efficiently handles a large number of doctors by fetching data page by page from the server.

Skeleton Loading States: Advanced skeleton loaders provide a superior perceived performance during initial data fetching.

Appointment Booking: An intuitive modal interface with a date picker for streamlined appointment scheduling.

Appointment Management: A dedicated "My Appointments" page where patients can view their schedule, filter by status, and cancel pending appointments.

Doctor Features
Appointment Dashboard: A centralized dashboard for doctors to manage their patient schedule.

Advanced Filtering: Appointments can be filtered by both date and status (Pending, Completed, Cancelled).

Server-Side Pagination: The appointment list is efficiently paginated to handle high volumes of appointments.

Real-Time Status Updates: Doctors can mark appointments as "Completed" or "Cancelled," with changes reflected instantly in the UI.

Optimistic Updates: UI updates for status changes are applied instantly for a fluid user experience, with robust error handling for rollbacks.

Technology Stack
The project leverages a modern and powerful set of technologies to achieve a professional and scalable result.

Core Framework: Next.js (React)

Styling: Tailwind CSS with a mobile-first approach.

State Management:

Redux Toolkit: For managing global client-side state, specifically for robust authentication.

React Query (TanStack Query): For all server state management, including data fetching, caching, and mutations.

React Context: For managing the global UI theme (light/dark mode).

Animations: Framer Motion for fluid and meaningful UI animations.

Form Handling & Validation: React Hook Form with Zod for schema-based, real-time validation.

API Communication: Axios with interceptors for streamlined and authenticated API requests.

UI Components & Libraries:

Headless UI: For building accessible and unstyled components like Modals.

react-toastify: For user-friendly notifications.

react-datepicker: For an intuitive date selection interface.

Getting Started
To set up and run this project on your local machine, please follow these steps.

Prerequisites
Node.js (v18.x or later recommended)

npm, yarn, or pnpm

Installation & Setup
Clone the repository:

git clone <YOUR_REPOSITORY_URL>

Navigate to the project directory:

cd <PROJECT_DIRECTORY>

Install dependencies:

npm install

or

yarn install

Run the development server:

npm run dev
