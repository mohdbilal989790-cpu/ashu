import { describe, expect, it } from "vitest";
import { appointmentSchema } from "@/lib/appointment";

const base = {
  name: "Asha",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  service: "Hair Treatments",
  preferred_time: "Morning (10–12)",
  notes: "",
};

describe("appointment request", () => {
  it("accepts a valid request for a future date", () => {
    expect(appointmentSchema.safeParse({ ...base, preferred_date: "2099-01-01" }).success).toBe(true);
  });
  it("rejects a date in the past", () => {
    expect(appointmentSchema.safeParse({ ...base, preferred_date: "2000-01-01" }).success).toBe(false);
  });
  it("rejects an unknown service", () => {
    expect(appointmentSchema.safeParse({ ...base, service: "Tattoo", preferred_date: "2099-01-01" }).success).toBe(false);
  });
});
