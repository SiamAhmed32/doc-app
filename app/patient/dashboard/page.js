// File: app/patient/dashboard/page.jsx (Corrected and Final)

"use client";

import { useState } from "react";
import { useDoctors } from "@/hooks/useDoctors"; // Assuming this hook is correct
import { useDebounce } from "@/hooks/useDebounce";
import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorCardSkeleton from "@/components/doctors/DoctorCardSkeleton";
import AppointmentBookingForm from "@/components/doctors/AppointmentBookingForm";
import DoctorProfileModal from "@/components/doctors/DoctorProfileModal"; // Import the new Profile Modal
import Pagination from "@/components/ui/Pagination";
import SearchIcon from "@/components/ui/SearchIcon";
import Modal from "@/components/ui/Modal";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

// This should be in a separate API file, but placing here for simplicity
const fetchSpecializations = async () => {
  const response = await apiClient.get("/specializations");
  return response.data.data;
};

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [doctorForBooking, setDoctorForBooking] = useState(null);
  const [doctorForProfile, setDoctorForProfile] = useState(null); // New state for the profile modal
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, error, isLoading, isFetching } = useDoctors({
    searchTerm: debouncedSearchTerm,
    specialization: selectedSpecialization,
    page: currentPage,
  });

  const doctors = data?.data || [];
  const totalRecords = data?.totalRecords || 0;
  const itemsPerPage = 12;

  const { data: specializations, isLoading: isLoadingSpecializations } =
    useQuery({
      queryKey: ["specializations"],
      queryFn: fetchSpecializations,
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      <main className="container mx-auto min-h-screen p-4 py-8 pt-24">
        <h1 className="mb-6 text-3xl font-bold dark:text-white">
          Find Your Doctor
        </h1>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Search and Filter Inputs */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by doctor name..."
              className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={selectedSpecialization}
            onChange={handleSpecializationChange}
            disabled={isLoadingSpecializations}
          >
            <option value="">All Specializations</option>
            {specializations?.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Grid */}
        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              Error: {error.message}
            </div>
          ) : doctors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={setDoctorForBooking}
                    onViewProfile={setDoctorForProfile} // Pass the new function
                    fallbackType="initials"
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={totalRecords}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p>
                No doctors found matching your criteria. Please try a different
                search.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Booking Modal */}
      <Modal
        isOpen={!!doctorForBooking}
        onClose={() => setDoctorForBooking(null)}
        title={`Book Appointment with ${doctorForBooking?.name}`}
      >
        {doctorForBooking && (
          <AppointmentBookingForm
            doctorId={doctorForBooking.id}
            onClose={() => setDoctorForBooking(null)}
          />
        )}
      </Modal>

      {/* NEW Profile Modal */}
      <DoctorProfileModal
        doctor={doctorForProfile}
        onClose={() => setDoctorForProfile(null)}
      />
    </div>
  );
}
