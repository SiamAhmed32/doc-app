"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Import the router

import Button from "../ui/Button";
import { createAppointment } from "@/lib/api/appointments";

const appointmentSchema = z.object({
  date: z.date({ required_error: "Please select a date." }),
});

export default function AppointmentBookingForm({ doctorId, onClose }) {
  const queryClient = useQueryClient();
  const router = useRouter(); // Initialize the router
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
      onClose();
      router.push("/patient/appointments"); // Redirect on success
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Booking failed.";
      toast.error(message);
    },
  });

  const onSubmit = (data) => {
    const appointmentData = {
      doctorId,
      date: data.date.toISOString(),
    };
    mutate(appointmentData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Select a Date
          </label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                placeholderText="Click to select a date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                minDate={new Date()}
                popperClassName="!z-30"
                popperPlacement="top-start"
              />
            )}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
          )}
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </div>
    </form>
  );
}
