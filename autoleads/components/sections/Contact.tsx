import { useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Send, Upload, CheckCircle2, Shield, Clock, Copy, Check, RefreshCw, ChevronDown, Search } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useCryptoPrices } from "../../hooks/use-crypto-prices";
import { countries, defaultCountry, type Country } from "../../data/countries";

const SETUP_FEE = 50_000;

const coins = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    key: "btc" as const,
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/15",
    icon: "\u20bf",
    address: "bc1p4h0mpf66yf3tf64auhz5hu0l22jagvfzsja6zz4qy63xcevgx6gs6qrf9h",
  },
  {
    name: "USDT (Tron)",
    ticker: "USDT",
    key: "usdt" as const,
    color: "text-teal-600",
    bgColor: "bg-teal-400/10",
    borderColor: "border-teal-400/15",
    icon: "\u20a7",
    address: "TQbzWvdvLoruNr4drYZXZNCQbrcK6CvV99",
  },
  {
    name: "Solana",
    ticker: "SOL",
    key: "sol" as const,
    color: "text-purple-600",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/15",
    icon: "\u25ce",
    address: "DZybEbVkahQq4L2zHx2Vs4jag9Has7TVs7i9BgY59CW5",
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    key: "eth" as const,
    color: "text-blue-600",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/15",
    icon: "\u039e",
    address: "0xA086baC43bD8fE83c8A97043eEca959DfD426AA6",
  },
];

function CryptoRow({
  coin,
  price,
  loading,
}: {
  coin: (typeof coins)[number];
  price: number | null;
  loading: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coin.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
  };

  const conversion =
    price && price > 0 ? (SETUP_FEE / price).toFixed(price > 1000 ? 4 : 2) : null;

  return (
    <div className={`bg-muted/50 border ${coin.borderColor} rounded-xl p-4 space-y-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`text-lg font-bold ${coin.color} w-6 text-center`}>{coin.icon}</span>
          <div>
            <span className="text-foreground font-semibold text-sm">{coin.name}</span>
            <span className="text-muted-foreground text-xs ml-1.5">{coin.ticker}</span>
          </div>
        </div>
        <div className="text-right">
          {loading && coin.ticker !== "USDT" ? (
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Loading...
            </div>
          ) : conversion ? (
            <span className={`text-sm font-semibold ${coin.color}`}>
              {coin.ticker === "USDT" ? "" : "≈ "}{conversion} {coin.ticker}
            </span>
          ) : (
            <span className="text-muted-foreground text-xs">&mdash;</span>
          )}
          {conversion && (
            <p className="text-muted-foreground text-[10px]">for $50,000 USD</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-background border border-border rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground break-all min-w-0 select-all">
          {coin.address}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
            copied
              ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/20"
              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border"
          }`}
          title={copied ? "Copied!" : `Copy ${coin.ticker} address`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function CountryCodeSelect({
  selected,
  onChange,
}: {
  selected: Country;
  onChange: (c: Country) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!search) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Country code: ${selected.name} ${selected.code}`}
        className="flex items-center gap-1 h-full px-2 py-2 bg-background border border-border rounded-l-xl text-xs hover:bg-muted/50 transition-colors min-w-[76px]"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="text-foreground font-medium text-xs">{selected.code}</span>
        <ChevronDown
          className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-background border border-border rounded-xl shadow-lg overflow-hidden w-[280px]" role="dialog" aria-label="Select country code">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setOpen(false);
                    setSearch("");
                  }
                }}
                placeholder="Search country..."
                aria-label="Search countries"
                className="w-full bg-muted/50 border border-border rounded-lg pl-8 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40"
              />
            </div>
          </div>
          <div className="max-h-[240px] overflow-y-auto" role="listbox" aria-label="Countries">
            {filtered.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">No results</p>
            )}
            {filtered.map((c) => (
              <button
                key={c.iso}
                type="button"
                role="option"
                aria-selected={selected.iso === c.iso}
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-muted/50 transition-colors text-left ${
                  selected.iso === c.iso ? "text-primary bg-primary/5" : "text-foreground"
                }`}
              >
                <span className="text-base leading-none">{c.flag}</span>
                <span className="flex-1 truncate text-xs">{c.name}</span>
                <span className="text-muted-foreground text-xs font-medium shrink-0">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(4, "Phone number is required")
    .regex(/^[\d\s\-().]+$/, "Please enter a valid phone number"),
  market: z.string().min(10, "Please describe your target market"),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const { toast } = useToast();
  const { prices, loading: pricesLoading, refreshing: pricesRefreshing, error: pricesError } = useCryptoPrices();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [fileError, setFileError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!fileName) {
      setFileError("Proof of payment is required");
      return;
    }
    setFileError(null);
    setIsSubmitting(true);
    const fullPhone = `${selectedCountry.code} ${data.phone}`;
    console.log("Submission:", { ...data, phone: fullPhone });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Submission Received",
      description: "We'll review your submission and confirm within 24\u201348 hours.",
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  const inputClasses =
    "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-muted-foreground/50";

  if (isSubmitted) {
    return (
      <section id="contact" className="py-28 bg-card border-t border-border relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-primary/[0.06] blur-[150px] pointer-events-none"></div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-border rounded-2xl p-12 shadow-sm"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-3xl font-display font-bold text-foreground mb-4">We've Got Your Details</h3>
            <p className="text-muted-foreground text-lg mb-2">
              Our team will review your submission and payment proof.
            </p>
            <p className="text-primary font-semibold text-lg">
              Expect confirmation within 24&ndash;48 hours.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>After confirmation, you'll receive a link to schedule your strategy call with our CEO.</span>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-28 bg-card border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-primary/[0.06] blur-[150px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
              Get Started
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to{" "}
              <span className="accent-gradient-text">Get Started?</span>
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Fill out the form below with your proof of payment and business details. Our team will verify your payment and reach out within 24&ndash;48 hours with your onboarding confirmation.
            </p>

            <div className="bg-background border border-amber-500/15 rounded-2xl p-6 mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{"\ud83d\udcb0"}</span>
                  <h4 className="text-foreground font-bold font-display text-lg">Payment Instructions</h4>
                </div>
                {!pricesLoading && (
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    {pricesRefreshing ? (
                      <>
                        <RefreshCw className="w-2.5 h-2.5 animate-spin text-muted-foreground" />
                        Updating...
                      </>
                    ) : pricesError ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full inline-block bg-red-400"></span>
                        Prices unavailable
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full inline-block bg-emerald-500 animate-pulse"></span>
                        Live prices
                      </>
                    )}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-5">
                Send the <strong className="text-foreground">$50,000 USD</strong> setup fee to one of the wallet addresses below, then upload your proof of payment in the form.
              </p>

              <div className="space-y-3">
                {coins.map((coin) => (
                  <CryptoRow
                    key={coin.key}
                    coin={coin}
                    price={prices[coin.key]}
                    loading={pricesLoading}
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Prices update every 30 seconds. Send the exact USD equivalent at time of transfer.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Shield,
                  title: "Secure & Verified",
                  sub: "Payment confirmed within 24\u201348 hours",
                },
                {
                  icon: Clock,
                  title: "Go-Live in 30 Days",
                  sub: "From payment to full operation",
                },
              ].map(({ icon: Icon, title, sub }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-background p-4 rounded-xl border border-border shadow-sm"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold">{title}</h4>
                    <p className="text-sm text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background border border-border p-8 rounded-2xl relative shadow-sm"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80 ml-1">Full Name</label>
                  <input
                    {...register("name")}
                    className={inputClasses}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1 ml-1">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80 ml-1">Company Name</label>
                  <input
                    {...register("company")}
                    className={inputClasses}
                    placeholder="Your Realty Company"
                  />
                  {errors.company && (
                    <p className="text-destructive text-xs mt-1 ml-1">{errors.company.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80 ml-1">Email Address</label>
                  <input
                    {...register("email")}
                    className={inputClasses}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1 ml-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80 ml-1">Phone Number</label>
                  <div className="flex">
                    <CountryCodeSelect
                      selected={selectedCountry}
                      onChange={setSelectedCountry}
                    />
                    <input
                      {...register("phone")}
                      className="flex-1 bg-background border border-l-0 border-border rounded-r-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-muted-foreground/50 pt-[12px] pb-[12px] pl-[1px] pr-[1px]"
                      placeholder="100 000 0000"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1 ml-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80 ml-1">
                  Tell us about your target market
                </label>
                <textarea
                  {...register("market")}
                  rows={3}
                  className={`${inputClasses} resize-none`}
                  placeholder="Property types, locations, buyer/seller preferences, current challenges..."
                />
                {errors.market && (
                  <p className="text-destructive text-xs mt-1 ml-1">{errors.market.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80 ml-1">
                  Proof of Payment
                </label>
                <label className="flex items-center justify-center gap-3 w-full bg-muted/50 border-2 border-dashed border-border rounded-xl px-4 py-6 cursor-pointer hover:border-primary/30 hover:bg-primary/[0.02] transition-all">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">
                    {fileName ? fileName : "Upload screenshot or transaction receipt"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFileName(file.name);
                        setFileError(null);
                      }
                    }}
                  />
                </label>
                {fileError && (
                  <p className="text-destructive text-xs mt-1 ml-1">{fileError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    Submitting <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit & Get Started <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-muted-foreground text-xs">
                Expect confirmation within 24&ndash;48 hours of submission.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
