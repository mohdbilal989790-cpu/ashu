import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { appointmentSchema, SERVICE_OPTIONS, TIME_OPTIONS } from "@/lib/appointment";
import { requestAppointment } from "@/lib/appointment.functions";

const inputCls =
  "peer w-full border-b border-input bg-transparent pb-3 pt-6 text-lg outline-none transition-colors placeholder-transparent focus:border-foreground";

function Wrap({ label, error, children, floating = true }: { label: string; error?: string | undefined; children: ReactNode; floating?: boolean }) {
  return (
    <label className="relative block">
      {children}
      <span
        className={`pointer-events-none absolute left-0 top-1 eyebrow text-[0.6rem] text-muted-foreground transition-all ${
          floating
            ? "peer-placeholder-shown:top-7 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1 peer-focus:text-[0.6rem] peer-focus:uppercase peer-focus:tracking-[0.35em]"
            : ""
        } peer-focus:text-foreground`}
      >
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 peer-focus:w-full" />
      {error && <span role="alert" className="mt-2 block text-xs text-muted-foreground">— {error}</span>}
    </label>
  );
}

export function BookingForm({ defaultService }: { defaultService?: string | undefined }) {
  const submit = useServerFn(requestAppointment);
  const [errors, setErrors] = useState<Partial<Record<"service" | "preferred_date" | "preferred_time" | "name" | "email" | "phone" | "notes", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = appointmentSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] ??= i.message; });
      setErrors(errs as typeof errors);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submit({ data: parsed.data });
      setStatus("done");
      form.reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-sm p-10 text-center">
          <p className="eyebrow text-muted-foreground">Request received</p>
          <p className="mt-4 font-serif text-4xl italic">Thank you.</p>
          <p className="mt-3 text-muted-foreground">I'll be in touch shortly to confirm your appointment.</p>
          <button onClick={() => setStatus("idle")} className="mt-8 eyebrow underline underline-offset-8">Make another request</button>
        </motion.div>
      ) : (
        <motion.form key="form" id="book" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass space-y-7 rounded-sm p-7 md:p-10">
          <div>
            <p className="eyebrow text-muted-foreground">Appointment request</p>
            <p className="mt-2 font-serif text-2xl italic">Choose your service & time</p>
          </div>
          <Wrap label="Service" error={errors.service} floating={false}>
            <select name="service" defaultValue={defaultService ?? ""} className={`${inputCls} appearance-none`}>
              <option value="" disabled className="bg-card">Select a service</option>
              {SERVICE_OPTIONS.map((s) => <option key={s} className="bg-card">{s}</option>)}
            </select>
          </Wrap>
          <div className="grid gap-7 sm:grid-cols-2">
            <Wrap label="Preferred date" error={errors.preferred_date} floating={false}>
              <input type="date" name="preferred_date" min={today} className={`${inputCls} [color-scheme:dark]`} />
            </Wrap>
            <Wrap label="Preferred time" error={errors.preferred_time} floating={false}>
              <select name="preferred_time" defaultValue="" className={`${inputCls} appearance-none`}>
                <option value="" disabled className="bg-card">Select a time</option>
                {TIME_OPTIONS.map((t) => <option key={t} className="bg-card">{t}</option>)}
              </select>
            </Wrap>
          </div>
          <Wrap label="Your name" error={errors.name}><input name="name" placeholder="Your name" autoComplete="name" maxLength={100} className={inputCls} /></Wrap>
          <div className="grid gap-7 sm:grid-cols-2">
            <Wrap label="Email" error={errors.email}><input name="email" type="email" placeholder="Email" autoComplete="email" maxLength={255} className={inputCls} /></Wrap>
            <Wrap label="Phone" error={errors.phone}><input name="phone" type="tel" placeholder="Phone" autoComplete="tel" maxLength={20} className={inputCls} /></Wrap>
          </div>
          <Wrap label="Hair goals or notes (optional)" error={errors.notes}><textarea name="notes" rows={3} placeholder="Notes" maxLength={1000} className={inputCls} /></Wrap>
          {status === "error" && <p role="alert" className="text-sm text-muted-foreground">{serverError}</p>}
          <button type="submit" disabled={status === "sending"} className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 eyebrow text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto">
            {status === "sending" ? "Sending…" : "Request Appointment"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
