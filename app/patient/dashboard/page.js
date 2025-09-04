"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useDoctors } from "../../../hooks/useDoctors";
import { useDebounce } from "../../../hooks/useDebounce";
import apiClient from "../../../lib/axios";
import DoctorCard from "../../../components/doctors/DoctorCard";
import DoctorCardSkeleton from "../../../components/doctors/DoctorCardSkeleton";
import Modal from "../../../components/ui/Modal";
import AppointmentBookingForm from "../../../components/doctors/AppointmentBookingForm";
import Pagination from "../../../components/ui/Pagination";
import SearchIcon from "../../../components/ui/SearchIcon";

const fetchSpecializations = async () => {
  const response = await apiClient.get("/specializations");
  return response.data.data;
};

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
    setCurrentPage(1);
  };

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

  const handleCloseModal = () => setSelectedDoctor(null);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900">
        <h1 className="mb-6 text-3xl font-bold dark:text-white">
          Find Your Doctor
        </h1>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-10 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-10 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold dark:text-white">
        Find Your Doctor
      </h1>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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

      <div className="relative">
        {isFetching && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm dark:bg-gray-900/60">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {!isFetching && error && (
          <div className="p-4 text-center text-red-500">
            Error: {error.message}
          </div>
        )}

        {!isFetching && !error && doctors.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookAppointment={() => setSelectedDoctor(doctor)}
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
        )}

        {!isFetching && !error && doctors.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>
              No doctors found matching your criteria. Please try a different
              search.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedDoctor}
        onClose={handleCloseModal}
        title={`Book Appointment with ${selectedDoctor?.name}`}
      >
        {selectedDoctor && (
          <AppointmentBookingForm
            doctorId={selectedDoctor.id}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}
