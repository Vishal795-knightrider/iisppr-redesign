import { motion } from "framer-motion";
import { D } from "../styles/theme";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";

// Final call-to-action bottom section component with Apple Glassmorphism and Antigravity Physics
export function FinalCTA() {
  return (
    <section id="cta" style={{
      background: D.bg,
      position: "relative",
      overflow: "hidden",
      padding: "120px clamp(1rem,4vw,2.5rem)",
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    }}>
      <GridBg opacity={0.02} />
      
      {/* Radiant blurred background glowing orbs */}
      <Orb x="50%" y="50%" r={700} color={D.orangeGl} opacity={0.25} blur={100} anim="animate-pulse-glow" />
      <Orb x="20%" y="70%" r={500} color={D.purpleGl} opacity={0.20} blur={90} anim="animate-float-slow" />
      <Orb x="80%" y="40%" r={500} color={D.cyanGl} opacity={0.22} blur={90} anim="animate-float-reverse" />

      <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal>
          {/* Frosted Glass Container with Antigravity Float */}
          <div
            className="rounded-[32px] p-8 sm:p-14 relative overflow-hidden animate-float-slow"
            style={{
              background: "rgba(255, 255, 255, 0.045)",
              backdropFilter: "blur(32px) saturate(1.8)",
              WebkitBackdropFilter: "blur(32px) saturate(1.8)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25), 0 0 50px rgba(249,115,22,0.12)",
            }}
          >
            {/* Ambient specular highlight */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-36 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)",
              }}
            />

            {/* Decorative quote mark */}
            <div style={{
              fontFamily: D.serif, fontSize: "clamp(48px,8vw,96px)",
              color: "rgba(255, 255, 255, 0.15)", lineHeight: 1, marginBottom: 8, userSelect: "none",
            }}>"</div>

            <h2 style={{
              fontFamily: D.serif,
              fontSize: "clamp(32px,5vw,58px)",
              fontWeight: 900, letterSpacing: "-2px",
              color: D.t0, lineHeight: 1.06, margin: "0 0 24px",
            }}>
              Ready to understand policy —
              <span style={{
                display: "block", fontStyle: "italic",
                background: "linear-gradient(110deg, #ff9a3c 0%, #f5c542 50%, #5eaf8e 80%, #38bdf8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: "drop-shadow(0 2px 20px rgba(249,115,22,0.3))",
              }}>and be part of changing it?</span>
            </h2>

            <p style={{
              fontSize: 16.5, color: D.t1, lineHeight: 1.8,
              marginBottom: 44, fontFamily: D.sans, maxWidth: 540, margin: "0 auto 44px",
            }}>
              18 power-packed lectures. 60 days. One program that bridges critical thinking, data science, and real-world policy impact. Limited seats for the March cohort.
            </p>

            {/* Action buttons row */}
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05, translateY: -3, boxShadow: "0 16px 40px rgba(245, 197, 66, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "16px 38px", borderRadius: 16,
                  background: "linear-gradient(135deg, #ffd700 0%, #c9973a 100%)",
                  color: "#09090b", fontSize: 16, fontWeight: 700,
                  textDecoration: "none", fontFamily: D.sans,
                  boxShadow: "0 8px 28px rgba(201,151,58,0.3), inset 0 1px 0 rgba(255,255,255,0.45)",
                }}
              >
                View Enrollment Offers
                <span style={{ fontSize: 18 }}>→</span>
              </motion.a>
              <motion.a
                href="#curriculum"
                whileHover={{ scale: 1.02, translateY: -2, borderColor: "rgba(255,255,255,0.35)" }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 30px", borderRadius: 16,
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: D.t0, fontSize: 16, fontWeight: 500,
                  textDecoration: "none", fontFamily: D.sans,
                  transition: "all 0.2s",
                }}
              >Explore Curriculum</motion.a>
            </div>

            {/* Trust points footer */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              gap: 24, flexWrap: "wrap",
            }}>
              {[
                { icon: "🔒", text: "Secure payment" },
                { icon: "📜", text: "Official certificate" },
                { icon: "🌍", text: "Globally accessible" },
                { icon: "🚀", text: "Start March 2nd week" },
              ].map(item => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]"
                  style={{
                    fontSize: 12.5, color: D.t2, fontFamily: D.sans,
                  }}
                >
                  <span>{item.icon}</span><span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
