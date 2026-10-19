import { createServerFn } from "@tanstack/react-start";
import { appointmentSchema } from "./appointment";

export const requestAppointment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => appointmentSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("appointment_requests").insert({
      ...data,
      notes: data.notes || null,
    });
    if (error) {
      console.error("appointment insert failed", error);
      throw new Error("Could not save your request. Please try again.");
    }
    return { ok: true };
  });
