import { createServerFn } from "@tanstack/react-start";
import { appointmentSchema } from "./appointment";

export const requestAppointment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => appointmentSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("appointment_requests").insert({
      name: data.name,
      service: data.service,
      notes: data.notes || null,
      email: data.email || "direct@ashuhairstylish.com",
      phone: data.phone || "8630818833",
      preferred_date: data.preferred_date || new Date().toISOString().slice(0, 10),
      preferred_time: data.preferred_time || "Morning (10–12)",
    });
    if (error) {
      console.error("appointment insert failed", error);
      throw new Error("Could not save your request. Please try again.");
    }
    return { ok: true };
  });
