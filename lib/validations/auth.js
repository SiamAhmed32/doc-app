import { z } from "zod";

const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long." });

const baseSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: passwordValidation,
  photo_url: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
});

export const patientRegisterSchema = baseSchema;

export const doctorRegisterSchema = baseSchema.extend({
  specialization: z
    .string()
    .min(1, { message: "Specialization is required." }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  role: z.enum(["PATIENT", "DOCTOR"], {
    errorMap: () => ({ message: "Please select a role." }),
  }),
});