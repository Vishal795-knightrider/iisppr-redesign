import { motion } from "framer-motion";
import { D } from "../styles/theme";
import { GridBg } from "./ui/GridBg";
import { Reveal } from "./ui/Reveal";

// Final call-to-action bottom section component inspired by GSSoC Impact Section
export function FinalCTA() {
  return (
    <section id="cta" style={{
      background: D.indigo,
      position: "relative",
      overflow: "hidden",
      padding: "110px clamp(1rem,4vw,2.5rem)",
      color: "#ffffff",
    }}>
      <GridBg opacity={0.04} />
      
      {/* Radiant GSSoC Teal & Mint glows */}
      <div style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 900, height: 900,
        background: "radial-gradient(circle, rgba(31,182,166,0.25) 0%, rgba(94,234,212,0.12) 35%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Reveal>
          {/* Frosted Glass Container */}
          <div
            className="rounded-[32px] p-8 sm:p-14 relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(28px) saturate(1.8)",
              WebkitBackdropFilter: "blur(28px) saturate(1.8)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            {/* Decorative quote mark */}
            <div style={{
              fontFamily: D.serif, fontSize: "clamp(48px,8vw,96px)",
              color: "rgba(31, 182, 166, 0.3)", lineHeight: 1, marginBottom: 8, userSelect: "none",
            }}>"</div>

            <h2 style={{
              fontFamily: D.sans,
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900, letterSpacing: "-2px",
              color: "#ffffff", lineHeight: 1.08, margin: "0 0 22px",
            }}>
              Ready to understand policy —
              <span style={{
                display: "block",
                background: "linear-gradient(90deg, #1FB6A6 0%, #5EEAD4 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>and be part of changing it?</span>
            </h2>

            <p style={{
              fontSize: 16.5, color: "rgba(255, 255, 255, 0.72)", lineHeight: 1.8,
              marginBottom: 42, fontFamily: D.sans, maxWidth: 540, margin: "0 auto 42px",
            }}>
              18 power-packed lectures. 60 days. One program that bridges critical thinking, data science, and real-world policy impact. Limited seats for the March cohort.
            </p>

            {/* Action buttons row */}
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.04, translateY: -2, boxShadow: "0 12px 30px rgba(31, 182, 166, 0.45)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 36px", borderRadius: 99,
                  background: "linear-gradient(135deg, #1FB6A6 0%, #2EC4B6 100%)",
                  color: "#ffffff", fontSize: 15.5, fontWeight: 700,
                  textDecoration: "none", fontFamily: D.sans,
                  boxShadow: "0 6px 20px rgba(31, 182, 166, 0.3)",
                }}
              >
                View Enrollment Offers
                <span style={{ fontSize: 17 }}>→</span>
              </motion.a>
              <motion.a
                href="#curriculum"
                whileHover={{ scale: 1.02, translateY: -2, borderColor: "#1FB6A6", color: "#1FB6A6" }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "15px 28px", borderRadius: 99,
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1.5px solid rgba(255, 255, 255, 0.22)",
                  color: "#ffffff", fontSize: 15.5, fontWeight: 600,
                  textDecoration: "none", fontFamily: D.sans,
                  transition: "all 0.2s",
                }}
              >Explore Curriculum</motion.a>
            </div>

            {/* Trust points footer */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              gap: 22, flexWrap: "wrap",
            }}>
              {[
                { icon: "🔒", text: "Secure payment" },
                { icon: "📜", text: "Official certificate" },
                { icon: "🌍", text: "Globally accessible" },
                { icon: "🚀", text: "Start March 2nd week" },
              ].map(item => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.10)",
                    fontSize: 12.5, color: "rgba(255, 255, 255, 0.75)", fontFamily: D.sans,
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
