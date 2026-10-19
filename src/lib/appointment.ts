import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Haircuts & Styling",
  "Blowouts & Finishing",
  "Hair Colour & Highlights",
  "Bridal & Occasion Styling",
  "Hair Treatments",
  "Personal Hair Consultation",
] as const;

export const TIME_OPTIONS = ["Morning (10–12)", "Midday (12–3)", "Afternoon (3–5)", "Evening (5–7)"] as const;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, "Enter a valid phone number"),
  service: z.enum(SERVICE_OPTIONS, { message: "Choose a service" }),
  preferred_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date")
    .refine((d) => d >= todayISO(), "Date can't be in the past"),
  preferred_time: z.enum(TIME_OPTIONS, { message: "Choose a time" }),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
