import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { D, ease } from "../styles/theme";
import { PLANS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Helper component for individual pricing plan cards with Apple Glassmorphism and Antigravity Hover Physics
function PlanCard({ plan, index }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Antigravity float animation classes based on index to create organic, non-synchronized floating
  const floatClasses = [
    "animate-float",
    "animate-float-slow",
    "animate-float-reverse",
  ];
  const floatClass = floatClasses[index % floatClasses.length];

  // Tailored glow shadows on hover
  const glowColors = {
    student: "rgba(94, 175, 142, 0.35)",
    prelaunch: "rgba(245, 197, 66, 0.45)",
    alumni: "rgba(168, 85, 247, 0.35)",
  };
  const activeGlow = glowColors[plan.id] || "rgba(255, 255, 255, 0.25)";

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
            background: "linear-gradient(135deg, rgba(255,215,0,0.7) 0%, rgba(249,115,22,0.5) 50%, rgba(168,85,247,0.4) 100%)",
            filter: "blur(6px)",
            opacity: hov ? 0.9 : 0.45,
            zIndex: 0,
          }}
        />
      )}

      {/* Floating Pill Badge */}
      {(plan.featuredLabel || plan.featured) && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase transition-transform duration-300"
          style={{
            background: plan.featured
              ? "linear-gradient(135deg, #ffd700 0%, #c9973a 100%)"
              : "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: plan.featured
              ? "1px solid rgba(255, 248, 220, 0.6)"
              : `1px solid ${plan.bNorm}`,
            color: plan.featured ? "#09090b" : plan.accent,
            fontFamily: D.sans,
            boxShadow: plan.featured
              ? "0 4px 20px rgba(245, 197, 66, 0.4)"
              : "0 4px 16px rgba(0, 0, 0, 0.4)",
            transform: hov ? "translateX(-50%) translateY(-3px) scale(1.05)" : "translateX(-50%) scale(1)",
          }}
        >
          {plan.featured ? `⭐ ${plan.featuredLabel}` : `✦ ${plan.featuredLabel}`}
        </div>
      )}

      {/* Main Glass Card with Smooth Antigravity Levitation on Hover */}
      <motion.div
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        animate={{
          y: hov ? -14 : 0,
          scale: hov ? 1.02 : 1,
          boxShadow: hov
            ? `0 35px 70px -10px ${activeGlow}, 0 20px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.35)`
            : plan.featured
              ? `0 24px 50px rgba(0,0,0,0.5), 0 0 30px rgba(245,197,66,0.15), inset 0 1px 0 rgba(255,255,255,0.2)`
              : `0 20px 45px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)`,
        }}
        transition={{ duration: 0.32, ease }}
        className="relative z-10 rounded-[24px] p-7 md:p-8 flex flex-col justify-between h-full overflow-hidden transition-colors duration-300"
        style={{
          background: plan.featured
            ? "rgba(255, 255, 255, 0.055)"
            : "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(30px) saturate(1.9)",
          WebkitBackdropFilter: "blur(30px) saturate(1.9)",
          border: `1px solid ${hov ? (plan.featured ? "rgba(255,215,0,0.45)" : plan.bHov) : (plan.featured ? "rgba(255,215,0,0.25)" : "rgba(255,255,255,0.10)")}`,
        }}
      >
        {/* Ambient Top Light Beam (Apple Specular Highlight) */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${plan.accentGl} 0%, transparent 70%)`,
            opacity: hov ? 0.9 : 0.45,
          }}
        />

        <div>
          {/* Plan tag */}
          <div className="mb-4">
            <Tag color={plan.tagColor} bg={plan.tagBg} border={plan.tagBorder}>
              {plan.tag}
            </Tag>
          </div>

          <div
            style={{
              fontFamily: D.serif,
              fontSize: 26,
              fontWeight: 900,
              color: D.t0,
              letterSpacing: "-0.6px",
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

          {/* Frosted Glass Price Block */}
          <div
            className="rounded-2xl p-4 sm:p-5 mb-6"
            style={{
              background: "rgba(0, 0, 0, 0.28)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="flex justify-between items-center mb-2.5">
              <span style={{ fontSize: 12, color: D.t3, fontFamily: D.sans }}>Actual Fee</span>
              <span style={{ fontSize: 14, color: D.t3, textDecoration: "line-through", fontFamily: D.sans }}>
                ₹{plan.actualFee.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div style={{ fontSize: 11, color: D.t2, fontFamily: D.sans, marginBottom: 2 }}>Offer Price</div>
                <div className="flex items-baseline gap-1">
                  <span style={{ fontSize: 18, color: plan.accent, fontFamily: D.sans, fontWeight: 800 }}>₹</span>
                  <span
                    style={{
                      fontFamily: D.serif,
                      fontSize: 44,
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
                className="px-3 py-2 rounded-xl text-center shadow-sm"
                style={{
                  background: plan.accentSo,
                  border: `1px solid ${plan.bNorm}`,
                }}
              >
                <div style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 900, color: plan.accent }}>
                  {plan.saving}
                </div>
                <div style={{ fontSize: 10, color: D.t3, fontFamily: D.sans }}>off</div>
              </div>
            </div>
          </div>

          {/* Action CTA button */}
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.025, translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl mb-6 text-sm font-bold tracking-tight text-center cursor-pointer transition-all duration-300"
            style={{
              background: plan.ctaFilled
                ? "linear-gradient(135deg, #ffd700 0%, #c9973a 100%)"
                : "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px)",
              border: plan.ctaFilled ? "1px solid rgba(255, 248, 220, 0.4)" : `1px solid ${plan.bNorm}`,
              color: plan.ctaFilled ? "#09090b" : plan.accent,
              fontFamily: D.sans,
              boxShadow: plan.ctaFilled
                ? "0 8px 24px rgba(245, 197, 66, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                : "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <span>{plan.cta}</span>
            <span>→</span>
          </motion.a>

          {/* Divider line */}
          <div className="h-[1px] bg-white/[0.08] mb-5" />

          {/* Plan features list */}
          <div className="flex flex-col gap-2.5">
            {plan.features.map(f => (
              <div
                key={f.text}
                className="flex items-center gap-2.5 transition-opacity duration-200"
                style={{ opacity: f.yes ? 1 : 0.32 }}
              >
                <div
                  className="w-4 h-4 rounded-md flex-shrink-0 flex items-center justify-center text-[9px] font-black"
                  style={{
                    background: f.yes ? plan.accentSo : "rgba(255,255,255,0.03)",
                    border: `1px solid ${f.yes ? plan.bNorm : "rgba(255,255,255,0.05)"}`,
                    color: f.yes ? plan.accent : D.t3,
                  }}
                >
                  {f.yes ? "✓" : "—"}
                </div>
                <span
                  style={{
                    fontSize: 12.5,
                    color: f.yes ? D.t1 : D.t3,
                    fontFamily: D.sans,
                    lineHeight: 1.4,
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
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${plan.bNorm}`,
            color: plan.noteColor,
            fontFamily: D.sans,
          }}
        >
          {plan.note}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Pricing / Enrollment section component with Apple Glassmorphism and Blurred Ambient Atmosphere
export function PricingSection() {
  return (
    <section id="pricing" style={{
      background: D.bg,
      position: "relative",
      overflow: "hidden",
      paddingTop: 110,
      paddingBottom: 110,
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    }}>
      <GridBg opacity={0.02} />
      
      {/* Radiant blurred glowing orbs: Deep Orange, Soft Purple, Cyan */}
      <Orb x="10%" y="30%" r={650} color={D.orangeGl} opacity={0.30} blur={95} anim="animate-pulse-glow" />
      <Orb x="90%" y="55%" r={600} color={D.purpleGl} opacity={0.28} blur={90} anim="animate-float-slow" />
      <Orb x="50%" y="85%" r={500} color={D.cyanGl} opacity={0.22} blur={85} anim="animate-float-reverse" />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>

        {/* Section header */}
        <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(249,115,22,0.15)] mb-3">
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.6px", color: D.goldBr, textTransform: "uppercase", fontFamily: D.sans }}>
              🎟 Enrollment Offers
            </span>
          </div>
          
          <h2 style={{
            fontFamily: D.serif,
            fontSize: "clamp(34px, 5.2vw, 58px)",
            fontWeight: 900, letterSpacing: "-2px",
            color: D.t0, margin: "16px 0", lineHeight: 1.05,
          }}>
            Choose your offer type
          </h2>
          <p style={{
            fontSize: 16, color: D.t2, maxWidth: 500,
            margin: "0 auto 28px", lineHeight: 1.75, fontFamily: D.sans,
          }}>
            Every offer accesses the same world-class curriculum. Your category determines pricing and benefits.
          </p>
          
          {/* Actual fee comparison pill with Apple Glassmorphism */}
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3),_inset_0_1px_0_rgba(255,255,255,0.25)] animate-float-slow">
            <span style={{ fontSize: 13, color: D.t2, fontFamily: D.sans }}>Actual Program Fee</span>
            <span style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 900, color: D.t0, letterSpacing: "-0.5px" }}>₹8,000</span>
            <div style={{ width: 1, height: 18, background: "rgba(255, 255, 255, 0.15)" }} />
            <span style={{ fontSize: 12.5, color: D.goldBr, fontWeight: 700, fontFamily: D.sans }}>Save up to 50% →</span>
          </div>
        </Reveal>

        {/* Plan cards grid with responsive stacking and antigravity physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pricing-grid">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Trust factors bottom bar with Frosted Glass pills */}
        <Reveal delay={0.3} style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {[
            { icon: "🔒", text: "Secure Payment" },
            { icon: "↩️", text: "Review Before Enrolling" },
            { icon: "📜", text: "IISPPR Certified" },
            { icon: "🌍", text: "Globally Accessible" },
          ].map(t => (
            <div
              key={t.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-transform duration-300 hover:-translate-y-1"
              style={{ fontSize: 12.5, color: D.t2, fontFamily: D.sans, boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
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
