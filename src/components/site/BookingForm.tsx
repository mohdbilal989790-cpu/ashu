import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { appointmentSchema, SERVICE_OPTIONS } from "@/lib/appointment";
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
      {error && <span role="alert" className="mt-2 block text-xs text-red-400">— {error}</span>}
    </label>
  );
}

const DEFAULT_HINGLISH_MSG =
  "Hello Ashu bhai! Mujhe appointment book karna hai for styling. Please available time slot aur details confirm karein.";

export function BookingForm({ defaultService }: { defaultService?: string | undefined }) {
  const submit = useServerFn(requestAppointment);
  const [service, setService] = useState(defaultService ?? "Haircuts & Styling");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState(DEFAULT_HINGLISH_MSG);
  const [errors, setErrors] = useState<Partial<Record<"service" | "name" | "notes", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = appointmentSchema.safeParse({
      name,
      service,
      notes,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] ??= i.message;
      });
      setErrors(errs as typeof errors);
      return;
    }
    setErrors({});
    setStatus("sending");

    // Prepare WhatsApp URL and open immediately
    const whatsappMessage = encodeURIComponent(
      `Hi Ashu! Mera naam ${name.trim()} hai.\nService: ${service}\n\nMessage: ${notes}`
    );
    const whatsappUrl = `https://wa.me/918630818833?text=${whatsappMessage}`;
    
    // Open WhatsApp in new tab / window
    window.open(whatsappUrl, "_blank");

    try {
      await submit({ data: parsed.data });
      setStatus("done");
    } catch (err) {
      // Even if server save fails, WhatsApp is already triggered
      setStatus("done");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setName("");
    setNotes(DEFAULT_HINGLISH_MSG);
    setErrors({});
  };

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 sm:p-10 text-center border border-white/10">
          <p className="eyebrow text-muted-foreground">WhatsApp Request Opened!</p>
          <p className="mt-4 font-serif text-3xl sm:text-4xl italic">Thank You, {name || "Ji"}!</p>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-md mx-auto text-sm">
            Aapka WhatsApp chat open ho gaya hai. Ashu aapse chat par slot aur timing confirm karenge.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleReset}
              className="rounded-full bg-white/10 px-8 py-3.5 eyebrow text-xs text-foreground transition-all hover:bg-white/20"
            >
              Naya Appointment Book Karein
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" id="book" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass space-y-7 rounded-2xl p-7 md:p-10 border border-white/10">
          <div>
            <p className="eyebrow text-muted-foreground">Appointment Booking</p>
            <p className="mt-2 font-serif text-2xl italic">Book your look with Ashu</p>
          </div>

          {/* Name Field */}
          <Wrap label="Aapka Name" error={errors.name}>
            <input
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Aapka naam yahan likhein"
              autoComplete="name"
              maxLength={100}
              className={inputCls}
            />
          </Wrap>

          {/* Service Field */}
          <Wrap label="Service chunein" error={errors.service} floating={false}>
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value as typeof service)}
              className={`${inputCls} appearance-none cursor-pointer`}
            >
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-card text-foreground">
                  {s}
                </option>
              ))}
            </select>
          </Wrap>

          {/* Custom Text / Predefined Hinglish Message */}
          <Wrap label="Message (Predefined Hinglish)" error={errors.notes}>
            <textarea
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Apna message yahan type karein..."
              maxLength={1000}
              className={`${inputCls} resize-none leading-relaxed`}
            />
          </Wrap>

          {status === "error" && <p role="alert" className="text-sm text-red-400">{serverError}</p>}

          {/* Only ONE button: Book Appointment that opens WhatsApp */}
          <div className="pt-2">
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 eyebrow text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book Appointment</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
