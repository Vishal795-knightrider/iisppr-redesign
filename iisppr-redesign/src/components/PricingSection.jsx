import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { D, ease } from "../styles/theme";
import { PLANS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Helper component for individual pricing plan cards in GSSoC Light Frosted Glass
function PlanCard({ plan, index }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Floating classes for organic antigravity floating physics
  const floatClasses = [
    "animate-float",
    "animate-float-slow",
    "animate-float-reverse",
  ];
  const floatClass = floatClasses[index % floatClasses.length];

  // Top strip accent gradients per plan
  const stripGradients = {
    student: "linear-gradient(90deg, #10b981, #34d399)",
    prelaunch: "linear-gradient(90deg, #1FB6A6, #5EEAD4)",
    alumni: "linear-gradient(90deg, #6366f1, #818cf8)",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease }}
      className={`relative w-full ${floatClass}`}
      style={{
        zIndex: plan.featured ? 10 : 1,
      }}
    >
      {/* Featured gradient halo for Pre-Launch */}
      {plan.featured && (
        <div
          className="absolute -inset-[2px] rounded-[26px] pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(31,182,166,0.5) 0%, rgba(94,234,212,0.3) 50%, rgba(99,102,241,0.25) 100%)",
            filter: "blur(6px)",
            opacity: hov ? 0.9 : 0.4,
            zIndex: 0,
          }}
        />
      )}

      {/* Floating Pill Badge */}
      {(plan.featuredLabel || plan.featured) && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase transition-transform duration-300"
          style={{
            background: plan.featured ? D.indigo : "#ffffff",
            border: plan.featured ? "none" : "1px solid #cbd5e1",
            color: plan.featured ? "#ffffff" : D.t0,
            fontFamily: D.sans,
            boxShadow: plan.featured
              ? "0 4px 16px rgba(11, 16, 38, 0.25)"
              : "0 4px 12px rgba(0, 0, 0, 0.08)",
            transform: hov ? "translateX(-50%) translateY(-3px) scale(1.05)" : "translateX(-50%) scale(1)",
          }}
        >
          {plan.featured ? `⭐ ${plan.featuredLabel}` : `✦ ${plan.featuredLabel}`}
        </div>
      )}

      {/* Main GSSoC Light Frosted Glass Card */}
      <motion.div
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        animate={{
          y: hov ? -12 : 0,
          scale: hov ? 1.015 : 1,
          boxShadow: hov
            ? "0 30px 60px rgba(11, 16, 38, 0.12), inset 0 1.5px 0 rgba(255,255,255,1)"
            : plan.featured
              ? "0 22px 50px rgba(11, 16, 38, 0.09), inset 0 1.5px 0 rgba(255,255,255,1)"
              : "0 16px 40px rgba(11, 16, 38, 0.06), inset 0 1.5px 0 rgba(255,255,255,1)",
        }}
        transition={{ duration: 0.32, ease }}
        className="relative z-10 rounded-[24px] p-7 md:p-8 flex flex-col justify-between h-full overflow-hidden transition-colors duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(28px) saturate(1.8)",
          WebkitBackdropFilter: "blur(28px) saturate(1.8)",
          border: plan.featured
            ? "1.5px solid rgba(31, 182, 166, 0.4)"
            : "1.5px solid rgba(255, 255, 255, 0.95)",
        }}
      >
        <div>
          {/* GSSoC Top Accent Strip */}
          <div
            style={{
              height: 3.5,
              borderRadius: 3,
              width: 38,
              marginBottom: 16,
              background: stripGradients[plan.id] || "linear-gradient(90deg, #1FB6A6, #5EEAD4)",
            }}
          />

          {/* Plan tag */}
          <div className="mb-4">
            <Tag color={plan.id === "prelaunch" ? D.teal : plan.accent}
                 bg={plan.id === "prelaunch" ? "rgba(31, 182, 166, 0.09)" : plan.tagBg}
                 border={plan.id === "prelaunch" ? "1px solid rgba(31, 182, 166, 0.22)" : plan.tagBorder}>
              {plan.tag}
            </Tag>
          </div>

          <div
            style={{
              fontFamily: D.sans,
              fontSize: 24,
              fontWeight: 800,
              color: D.t0,
              letterSpacing: "-0.5px",
              marginBottom: 8,
            }}
          >
            {plan.name} Offer
          </div>

          <p
            style={{
              fontSize: 13.5,
              color: D.t2,
              lineHeight: 1.65,
              marginBottom: 24,
              fontFamily: D.sans,
              minHeight: 44,
            }}
          >
            {plan.desc}
          </p>

          {/* Price Block in Soft Light Slate */}
          <div
            className="rounded-2xl p-4 sm:p-5 mb-6"
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
            }}
          >
            <div className="flex justify-between items-center mb-2.5">
              <span style={{ fontSize: 12, color: D.t3, fontFamily: D.sans, fontWeight: 500 }}>Actual Fee</span>
              <span style={{ fontSize: 14, color: D.t3, textDecoration: "line-through", fontFamily: D.sans, fontWeight: 500 }}>
                ₹{plan.actualFee.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div style={{ fontSize: 11, color: D.t2, fontFamily: D.sans, marginBottom: 2, fontWeight: 600 }}>Offer Price</div>
                <div className="flex items-baseline gap-1">
                  <span style={{ fontSize: 18, color: D.t0, fontFamily: D.sans, fontWeight: 800 }}>₹</span>
                  <span
                    style={{
                      fontFamily: D.sans,
                      fontSize: 42,
                      fontWeight: 900,
                      color: D.t0,
                      letterSpacing: "-2px",
                      lineHeight: 1,
                    }}
                  >
                    {plan.price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div
                className="px-3 py-1.5 rounded-full text-center shadow-xs"
                style={{
                  background: "rgba(31, 182, 166, 0.12)",
                  border: "1px solid rgba(31, 182, 166, 0.25)",
                }}
              >
                <div style={{ fontFamily: D.sans, fontSize: 16, fontWeight: 800, color: D.teal }}>
                  {plan.saving}
                </div>
                <div style={{ fontSize: 9.5, color: D.teal, fontFamily: D.sans, fontWeight: 600 }}>OFF</div>
              </div>
            </div>
          </div>

          {/* Action CTA button */}
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.025, translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full mb-6 text-sm font-bold tracking-tight text-center cursor-pointer transition-all duration-300"
            style={{
              background: plan.ctaFilled ? D.indigo : "#ffffff",
              border: plan.ctaFilled ? "none" : "1.5px solid #cbd5e1",
              color: plan.ctaFilled ? "#ffffff" : D.t0,
              fontFamily: D.sans,
              boxShadow: plan.ctaFilled
                ? "0 6px 20px rgba(11, 16, 38, 0.2)"
                : "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <span>{plan.cta}</span>
            <span>→</span>
          </motion.a>

          {/* Divider line */}
          <div className="h-[1px] bg-slate-200 mb-5" />

          {/* Plan features list */}
          <div className="flex flex-col gap-2.5">
            {plan.features.map(f => (
              <div
                key={f.text}
                className="flex items-center gap-2.5 transition-opacity duration-200"
                style={{ opacity: f.yes ? 1 : 0.35 }}
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black"
                  style={{
                    background: f.yes ? "rgba(31, 182, 166, 0.12)" : "#f1f5f9",
                    color: f.yes ? D.teal : D.t3,
                  }}
                >
                  {f.yes ? "✓" : "—"}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: f.yes ? D.t1 : D.t3,
                    fontFamily: D.sans,
                    lineHeight: 1.4,
                    fontWeight: 500,
                  }}
                >
                  {f.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Informational note footer */}
        <div
          className="mt-6 p-3 rounded-xl text-[11.5px] leading-relaxed"
          style={{
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            color: D.t2,
            fontFamily: D.sans,
            fontWeight: 500,
          }}
        >
          {plan.note}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Pricing / Enrollment section component with GSSoC clean light theme & Apple Glassmorphism
export function PricingSection() {
  return (
    <section id="pricing" style={{
      background: "#F8FAFC",
      position: "relative",
      overflow: "hidden",
      paddingTop: 100,
      paddingBottom: 100,
      borderTop: "1px solid #E2E8F0",
    }}>
      <GridBg opacity={0.04} />
      
      {/* Soft luminous ambient glows */}
      <div style={{
        position: "absolute", top: "20%", left: "-10%", width: 700, height: 700,
        background: "radial-gradient(circle, rgba(31,182,166,0.12) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-10%", width: 650, height: 650,
        background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>

        {/* Section header */}
        <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3"
            style={{
              background: "rgba(31, 182, 166, 0.08)",
              border: "1.5px solid rgba(31, 182, 166, 0.25)",
            }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.5px", color: D.teal, textTransform: "uppercase", fontFamily: D.sans }}>
              🎟 Enrollment Offers
            </span>
          </div>
          
          <h2 style={{
            fontFamily: D.sans,
            fontSize: "clamp(32px, 4.8vw, 54px)",
            fontWeight: 900, letterSpacing: "-1.8px",
            color: D.t0, margin: "14px 0", lineHeight: 1.05,
          }}>
            Choose your offer type
          </h2>
          <p style={{
            fontSize: 16, color: D.t2, maxWidth: 500,
            margin: "0 auto 28px", lineHeight: 1.75, fontFamily: D.sans,
          }}>
            Every offer accesses the same world-class curriculum. Your category determines pricing and benefits.
          </p>
          
          {/* Actual fee comparison pill */}
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm animate-float-slow">
            <span style={{ fontSize: 13, color: D.t2, fontFamily: D.sans, fontWeight: 500 }}>Actual Program Fee</span>
            <span style={{ fontFamily: D.sans, fontSize: 18, fontWeight: 900, color: D.t0, letterSpacing: "-0.5px" }}>₹8,000</span>
            <div style={{ width: 1, height: 16, background: "#cbd5e1" }} />
            <span style={{ fontSize: 13, color: D.teal, fontWeight: 700, fontFamily: D.sans }}>Save up to 50% →</span>
          </div>
        </Reveal>

        {/* Plan cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pricing-grid">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Trust factors bottom bar */}
        <Reveal delay={0.3} style={{ marginTop: 55, display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
          {[
            { icon: "🔒", text: "Secure Payment" },
            { icon: "↩️", text: "Review Before Enrolling" },
            { icon: "📜", text: "IISPPR Certified" },
            { icon: "🌍", text: "Globally Accessible" },
          ].map(t => (
            <div
              key={t.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 shadow-xs transition-transform duration-300 hover:-translate-y-1"
              style={{ fontSize: 12.5, fontFamily: D.sans, fontWeight: 600 }}
            >
              <span>{t.icon}</span>
              <span>{t.text}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
