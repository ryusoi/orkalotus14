import { useState } from "react";
import { Link } from "wouter";
import {
  Check,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Plane,
  QrCode,
  Send,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import {
  QR_CODE_URL,
  WEBSITE_URL,
  WHATSAPP_SHARE_URL,
} from "@/data/navigation";
import type { Locale } from "@/data/content";

export default function ContactPage() {
  const { locale, setLocale } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for reaching out!", {
      description: "Our guest concierge team will respond to your message promptly.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(WEBSITE_URL);
      }
      setCopied(true);
      toast.success("Website link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info(WEBSITE_URL);
    }
  };

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* Subpage Hero */}
      <section className="subpage-hero">
        <div className="container subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact &amp; Location</span>
          </div>

          <span className="subpage-eyebrow">
            <span className="section-label-line" />
            Direct Reception &amp; Guest Relations
          </span>

          <h1 className="subpage-title">
            Contact Us · <em>Always at Your Service</em>
          </h1>

          <p className="subpage-description">
            Reach out to our reservations, front desk, and guest relations team. We are here 24 hours a day to assist with your inquiries, airport transfers, and special requests.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="section bg-[var(--paper)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="p-8 bg-[var(--shell)] border border-[var(--line)] rounded-2xl shadow-sm">
                <span className="section-label">
                  <span className="section-label-line" />
                  Direct Inquiry
                </span>
                <h2 className="font-serif text-3xl font-medium text-[var(--ink)] mt-2 mb-2">
                  Send a Message to Concierge
                </h2>
                <p className="text-xs text-[var(--ink-soft)] mb-6">
                  Please fill out the form below and our team will get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[var(--ink-soft)] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full px-4 py-2.5 bg-[var(--paper)] border border-[var(--line)] rounded-lg text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--tide)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold tracking-wider text-[var(--ink-soft)] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-[var(--paper)] border border-[var(--line)] rounded-lg text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--tide)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[var(--ink-soft)] mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[var(--paper)] border border-[var(--line)] rounded-lg text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--tide)]"
                    >
                      <option>Room Reservations &amp; Availability</option>
                      <option>VIP Airport Transfer Arrangement</option>
                      <option>Spa &amp; Hammam Bookings</option>
                      <option>Special Occasions (Honeymoon / Anniversary)</option>
                      <option>Dietary Requirements &amp; Allergies</option>
                      <option>Other General Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold tracking-wider text-[var(--ink-soft)] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we assist you with your stay at Orka Lotus Beach?"
                      className="w-full px-4 py-2.5 bg-[var(--paper)] border border-[var(--line)] rounded-lg text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--tide)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[var(--ocean)] hover:bg-[var(--tide)] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={15} /> Send Direct Message
                  </button>
                </form>
              </div>
            </div>

            {/* Direct Contact Channels & QR Code Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Hotel Information Box */}
              <div className="p-8 bg-[var(--ocean)] text-white rounded-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#e8c883]">
                  Orka Lotus Beach
                </span>
                <h3 className="font-serif text-3xl font-light mt-1 mb-6">
                  Direct Communications
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-[#e8c883] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white block">
                        Telephone &amp; Call Center
                      </strong>
                      <a
                        href="tel:4446752"
                        className="text-xs text-white/80 hover:text-white hover:underline block"
                      >
                        444 6 752 (Within Türkiye)
                      </a>
                      <a
                        href="tel:+902524555055"
                        className="text-xs text-white/80 hover:text-white hover:underline block"
                      >
                        +90 252 455 50 55 (International)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-[#e8c883] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white block">
                        Email Inquiries
                      </strong>
                      <a
                        href="mailto:info.orkalotus@orkahotels.com"
                        className="text-xs text-white/80 hover:text-white hover:underline"
                      >
                        info.orkalotus@orkahotels.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#e8c883] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white block">
                        Physical Address
                      </strong>
                      <p className="text-xs text-white/80 leading-relaxed">
                        Cumhuriyet Mah. Atatürk Cad. No:56, İçmeler, Marmaris, 48720 Muğla, Türkiye
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <a
                    href={WHATSAPP_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25d366] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 hover:bg-[#1ebc57] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Website QR Code Card */}
              <div className="p-6 bg-[var(--shell)] border border-[var(--line)] rounded-2xl flex flex-col items-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-3 flex items-center gap-1.5">
                  <QrCode size={16} className="text-[var(--gold)]" />
                  Share Hotel Website
                </span>

                <div className="p-3 bg-white border border-[var(--line)] rounded-xl shadow-sm mb-3">
                  <img
                    src={QR_CODE_URL}
                    alt="Orka Lotus Beach Website QR Code"
                    className="w-36 h-36 object-contain"
                  />
                </div>

                <p className="text-[11px] text-[var(--ink-soft)] mb-4">
                  Scan with any smartphone camera to access <strong>orkalotusbeach.vercel.app</strong>
                </p>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 py-2 bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--tide)] rounded text-xs font-bold uppercase tracking-wider text-[var(--ink)] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy Link"}</span>
                  </button>
                  <a
                    href={WHATSAPP_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-[#25d366] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#1ebc57] transition-colors"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Distance & Transfer Guide */}
      <section className="section bg-[var(--shell)] border-t border-[var(--line)]">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="section-label">
              <span className="section-label-line" />
              Travel &amp; Arrival
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
              Getting to <em>Orka Lotus Beach</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[var(--paper)] border border-[var(--line)] rounded-xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--tide-soft)] text-[var(--tide)] flex items-center justify-center flex-shrink-0">
                <Plane size={22} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  Primary Airport (DLM)
                </span>
                <h3 className="font-serif text-2xl font-medium text-[var(--ink)] mt-0.5">
                  Dalaman Airport (100 km)
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed">
                  Approx. 90 minutes scenic drive through pine-forested mountains. Private VIP Mercedes Vito transfers can be booked directly through reception.
                </p>
              </div>
            </div>

            <div className="p-6 bg-[var(--paper)] border border-[var(--line)] rounded-xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--tide-soft)] text-[var(--tide)] flex items-center justify-center flex-shrink-0">
                <Plane size={22} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                  Secondary Airport (BJV)
                </span>
                <h3 className="font-serif text-2xl font-medium text-[var(--ink)] mt-0.5">
                  Milas-Bodrum Airport (140 km)
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed">
                  Approx. 120 minutes drive along the scenic Mugla highway. Chauffeur services available 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
