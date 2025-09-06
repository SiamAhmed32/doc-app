Doctor Appointment Management System
A modern, responsive, and feature-rich frontend for a doctor-patient appointment management platform. This project is built with a professional-grade technology stack and is designed for scalability, performance, and an exceptional user experience.

Live Application URL: digitaldocappointment.netlify.app

Table of Contents
Project Overview

Key Features

Technology Stack

Architectural Highlights

Getting Started

API Information

Project Overview
This application provides a seamless and intuitive interface for both patients and doctors to manage medical appointments. The user experience has been meticulously crafted, from the immersive, animated login screen to the dynamic, auth-aware navigation.

Patients can search for healthcare providers, view their profiles instantly via modals, book available slots, and manage their appointment history. Doctors are provided with a dedicated dashboard to view their schedule, filter appointments by date and status, and update appointment outcomes in real-time.

The system is built with a mobile-first, responsive design, ensuring full functionality and an optimal viewing experience across all devices.

Key Features
General Features
Modern Authentication Experience: A completely redesigned "Glassmorphism" UI for login and registration, featuring a sleek role selector, password visibility toggle, and "Forgot Password" functionality.

Role-Based Access Control: Secure system for two distinct user roles: Patient and Doctor, ensuring users only see relevant information.

Dynamic & Auth-Aware UI: The user interface intelligently adapts based on authentication status. For instance, "Login/Register" buttons are replaced with dashboard links for logged-in users, creating a cleaner, smarter experience.

Persistent Sessions: User authentication state is persisted in local storage, providing a seamless experience across browser sessions.

User Profile Management: A dedicated and secure "Your Profile" page allowing users to view and update their personal information, such as their name and photo URL.

Light & Dark Mode: A user-controlled theme toggle for personalized viewing comfort, with the user's preference saved locally.

Responsive Design: The entire application is fully responsive and optimized for a wide range of screen sizes.

Rich User Feedback: Real-time form validation and toast notifications for all critical user actions provide clear and immediate feedback.

Patient Features
Advanced Doctor Search: A comprehensive directory of doctors with real-time, debounced search by name.

Instant Profile Previews: View doctor details instantly via a modal without leaving the search page, creating a faster, seamless browsing experience.

Filter by Specialization: A dropdown filter allows patients to easily browse doctors by their medical specialty.

Server-Side Pagination: Efficiently handles a large number of doctors by fetching data page by page.

Skeleton Loading States: Advanced skeleton loaders provide a superior perceived performance during data fetching.

Streamlined Appointment Booking: An intuitive modal interface with a date picker for easy appointment scheduling.

Appointment Management: A dedicated "My Appointments" page to view, filter by status, and cancel pending appointments.

Doctor Features
Centralized Appointment Dashboard: A comprehensive dashboard for doctors to manage their entire patient schedule.

Advanced Filtering: Appointments can be filtered by both date and status (Pending, Completed, Cancelled).

Real-Time Status Updates: Doctors can mark appointments as "Completed" or "Cancelled," with changes reflected instantly.

Technology Stack
The project leverages a modern and powerful set of technologies to achieve a professional and scalable result.

Core Framework: Next.js 14+ (React) with the App Router.

Styling: Tailwind CSS with a mobile-first approach and custom CSS animations.

State Management:

Redux Toolkit: For robust, centralized management of global client-side state (authentication).

React Query (TanStack Query): For all server state management, including data fetching, caching, and mutations.

React Context: For managing the global UI theme (light/dark mode).

Animations: Framer Motion for fluid and meaningful UI animations.

Form Handling & Validation: React Hook Form with Zod for schema-based, real-time validation.

API Communication: Axios with interceptors for streamlined and authenticated API requests.

UI Components & Libraries:

Headless UI: For building accessible and unstyled components like Modals.

react-toastify: For user-friendly notifications.

react-datepicker: For an intuitive date selection interface.

Architectural Highlights
Component-Driven Architecture: The UI is composed of small, reusable, and encapsulated components (e.g., Button, Modal, Input), promoting consistency and maintainability.

Separation of Concerns: A clear distinction is maintained between UI components, state management logic (custom hooks like useLoginForm), and API service layers.

Efficient Server State: React Query is used to its full potential for caching server data, eliminating redundant API calls, and managing loading/error states gracefully.

Scalable Authentication Flow: Redux Toolkit provides a centralized, predictable, and easily debuggable state container for managing the user's session across the entire application.

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

Run the development server:

npm run dev

The application will be available at http://localhost:3000.

API Information
This frontend application is designed to work with a backend API. The base URL for the API is configured in lib/axios.js. All API calls for authentication, fetching doctors, and managing appointments are routed through this central client.