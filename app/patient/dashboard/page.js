"use client";

import { useState } from "react";
import { useDoctors } from "@/hooks/useDoctors";
import { useDebounce } from "@/hooks/useDebounce";
import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorCardSkeleton from "@/components/doctors/DoctorCardSkeleton";
import AppointmentBookingForm from "@/components/doctors/AppointmentBookingForm";
import DoctorProfileModal from "@/components/doctors/DoctorProfileModal";
import Pagination from "@/components/ui/Pagination";
import SearchIcon from "@/components/ui/SearchIcon";
import Modal from "@/components/ui/Modal";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import FullPageLoader from "@/components/ui/FullPageLoader";

const fetchSpecializations = async () => {
  const response = await apiClient.get("/specializations");
  return response.data.data;
};

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [doctorForBooking, setDoctorForBooking] = useState(null);
  const [doctorForProfile, setDoctorForProfile] = useState(null);
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
  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-[calc(100vh-72px)]">
      <main className="container mx-auto min-h-screen px-2 py-4 pt-20 sm:px-4 sm:py-8 sm:pt-24">
        <h1 className="mb-4 text-2xl sm:text-3xl font-bold dark:text-white text-gray-900">
          Book an Appointment
        </h1>
        <div className="mb-6 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by doctor name…"
              className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search by doctor name"
            />
          </div>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={selectedSpecialization}
            onChange={handleSpecializationChange}
            disabled={isLoadingSpecializations}
            aria-label="Filter by specialization"
          >
            <option value="">All Specializations</option>
            {specializations?.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={setDoctorForBooking}
                    onViewProfile={setDoctorForProfile}
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

      {/* Book appointment modal */}
      <Modal
        isOpen={!!doctorForBooking}
        onClose={() => setDoctorForBooking(null)}
        title={
          doctorForBooking
            ? `Book Appointment with ${doctorForBooking.name}`
            : ""
        }
      >
        {doctorForBooking && (
          <AppointmentBookingForm
            doctorId={doctorForBooking.id}
            onClose={() => setDoctorForBooking(null)}
          />
        )}
      </Modal>

      {/* Doctor profile modal */}
      <DoctorProfileModal
        doctor={doctorForProfile}
        onClose={() => setDoctorForProfile(null)}
      />
    </div>
  );
}
