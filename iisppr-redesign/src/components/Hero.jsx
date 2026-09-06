import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { D, ease } from "../styles/theme";
import { HERO_STATS, TRUST_BADGES } from "../data/constants";
import { useCountUp } from "../hooks/useCountUp";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Tag } from "./ui/Tag";

// Helper component for animating stats in Hero section
function StatCounter({ stat, isPill = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(stat.value, stat.value > 100 ? 2000 : 1400, inView);
  
  if (isPill) {
    return (
      <div ref={ref} className="flex items-center gap-2.5 px-3 py-1">
        <span className="text-base sm:text-lg select-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          {stat.icon}
        </span>
        <div className="flex flex-col text-left">
          <div style={{
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 800,
            color: D.t0,
            lineHeight: 1.1,
            fontFamily: D.serif,
            letterSpacing: "-0.5px",
          }}>
            {count.toLocaleString()}{stat.suffix}
          </div>
          <div style={{
            fontSize: 10,
            color: D.t2,
            fontFamily: D.sans,
            letterSpacing: "0.2px",
            whiteSpace: "nowrap",
          }}>
            {stat.label}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontSize: 28, fontWeight: 400, color: D.t0, lineHeight: 1,
        fontFamily: D.serif, letterSpacing: "-0.5px",
      }}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div style={{ fontSize: 12, color: D.t2, marginTop: 4, fontFamily: D.sans }}>{stat.label}</div>
    </div>
  );
}

// Hero section component with Apple Glassmorphism and Antigravity Floating Physics
export function Hero() {
  const stagger = {
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const child = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
  };

  return (
    <section id="program" style={{
      position: "relative", overflow: "hidden",
      background: D.bg,
      paddingTop: "clamp(100px, 16vh, 150px)",
      paddingBottom: "clamp(70px, 10vh, 110px)",
    }}>
      <GridBg opacity={0.025} />
      
      {/* Apple-style glowing orbs: Deep Orange, Soft Purple, and Cyan */}
      <Orb x="12%" y="15%" r={700} color={D.orangeGl} opacity={0.35} blur={90} anim="animate-pulse-glow" />
      <Orb x="88%" y="30%" r={600} color={D.purpleGl} opacity={0.30} blur={85} anim="animate-float-slow" />
      <Orb x="45%" y="85%" r={550} color={D.cyanGl} opacity={0.25} blur={90} anim="animate-float-reverse" />

      {/* Vignette overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(9,9,11,0.92) 0%, transparent 65%)",
      }} />

      <div style={{
        maxWidth: 1160, margin: "0 auto",
        padding: "0 clamp(1rem,4vw,2.5rem)",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr min(340px, 35%)",
          gap: "3rem 5rem",
          alignItems: "start",
        }} className="hero-grid">

          {/* Left side content */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={child} style={{ marginBottom: 24 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(249,115,22,0.15)] animate-float-slow">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span style={{
                  fontSize: 11.5, fontWeight: 700, letterSpacing: "0.6px",
                  color: D.goldBr, textTransform: "uppercase", fontFamily: D.sans,
                }}>
                  🚀 March Cohort — Enrollment Open
                </span>
              </div>
            </motion.div>

            {/* Main Headline with vibrant GirlScript energy + Apple sleek typography */}
            <motion.h1 variants={child} style={{
              fontFamily: D.serif,
              fontSize: "clamp(40px, 6.2vw, 76px)",
              fontWeight: 900, lineHeight: 1.02,
              letterSpacing: "-2.8px", color: D.t0,
              margin: "0 0 24px", maxWidth: 650,
            }}>
              Quantitative{" "}
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(110deg, #ff9a3c 0%, #f5c542 50%, #5eaf8e 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: "drop-shadow(0 2px 18px rgba(249,115,22,0.28))",
              }}>Research</span>
              {" "}&amp;{" "}
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(110deg, #38bdf8 0%, #a855f7 55%, #ec4899 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: "drop-shadow(0 2px 20px rgba(6,182,212,0.25))",
              }}>Data Science</span>
            </motion.h1>

            <motion.p variants={child} style={{
              fontSize: "clamp(15px,1.8vw,17.5px)", color: D.t1,
              lineHeight: 1.78, maxWidth: 520, margin: "0 0 36px",
              fontFamily: D.sans,
            }}>
              A 60-day intensive online program blending public policy, data science, and AI-driven governance. Think critically. Research boldly. Get published.
            </motion.p>

            {/* Call to action buttons */}
            <motion.div variants={child} style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
              <motion.a href="#pricing"
                whileHover={{ scale: 1.04, translateY: -3, boxShadow: "0 16px 36px rgba(245, 197, 66, 0.35)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 30px", borderRadius: 14,
                  background: "linear-gradient(135deg, #e8b84b 0%, #c9973a 100%)",
                  color: "#09090b", fontSize: 15, fontWeight: 700,
                  textDecoration: "none", fontFamily: D.sans,
                  letterSpacing: "-0.1px",
                  boxShadow: "0 8px 24px rgba(201,151,58,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                }}>
                View Enrollment Offers <span style={{ fontSize: 17 }}>→</span>
              </motion.a>
              <motion.a href="#curriculum"
                whileHover={{ scale: 1.02, translateY: -2, borderColor: "rgba(255,255,255,0.3)" }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 26px", borderRadius: 14,
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: D.t0, fontSize: 15, fontWeight: 500,
                  textDecoration: "none", fontFamily: D.sans,
                  transition: "all 0.2s",
                }}>Explore Curriculum</motion.a>
            </motion.div>

            {/* Glowing Pill-Shaped Glassmorphism Stats Bar Floating Below Text */}
            <motion.div
              variants={child}
              className="animate-float"
              style={{
                marginBottom: 36,
                maxWidth: 620,
              }}
            >
              <div
                className="glass-pill rounded-3xl sm:rounded-full p-2.5 sm:p-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-2"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(24px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.8)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(249, 115, 22, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
                }}
              >
                {HERO_STATS.map((s, idx) => (
                  <div key={s.label} className="flex items-center flex-1 min-w-[120px] sm:min-w-0 justify-center">
                    <StatCounter stat={s} isPill={true} />
                    {idx < HERO_STATS.length - 1 && (
                      <div className="hidden sm:block w-[1px] h-8 bg-white/10 mx-1 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust badges row */}
            <motion.div variants={child} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TRUST_BADGES.map(b => (
                <div key={b.text}
                  className="transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 14px", borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: 12, color: D.t2, fontFamily: D.sans,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}>
                  <span style={{ fontSize: 13 }}>{b.icon}</span>{b.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side floating card with Apple Glassmorphism and Weightless Antigravity Float */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="hero-card animate-float-delayed"
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(32px) saturate(1.8)",
                WebkitBackdropFilter: "blur(32px) saturate(1.8)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 24,
                padding: "30px 26px",
                boxShadow: "0 32px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 50px rgba(201,151,58,0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle top ambient specular light */}
              <div style={{
                position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
                width: 220, height: 100,
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div style={{
                fontSize: 11, fontWeight: 700, color: D.t2,
                letterSpacing: "1px", textTransform: "uppercase",
                fontFamily: D.sans, marginBottom: 20,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span>Program at a Glance</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              </div>

              {HERO_STATS.map((s, i) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  paddingBottom: i < HERO_STATS.length - 1 ? 14 : 0,
                  marginBottom: i < HERO_STATS.length - 1 ? 14 : 0,
                  borderBottom: i < HERO_STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  }}>{s.icon}</div>
                  <div>
                    <StatCounter stat={s} />
                  </div>
                </div>
              ))}

              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "22px 0" }} />

              {/* Pre-launch pill with glowing gold glass */}
              <div style={{
                padding: "14px 16px", borderRadius: 16,
                background: "rgba(245, 197, 66, 0.08)",
                border: "1px solid rgba(245, 197, 66, 0.28)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 24px rgba(201,151,58,0.12), inset 0 1px 0 rgba(255,248,220,0.25)",
              }}>
                <div style={{
                  fontSize: 10.5, color: D.goldBr, fontWeight: 800,
                  fontFamily: D.sans, letterSpacing: "0.7px", textTransform: "uppercase", marginBottom: 6,
                }}>
                  ⏳ Pre-Launch Offer
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{
                    fontFamily: D.serif, fontSize: 28, fontWeight: 900,
                    color: D.goldBr, letterSpacing: "-1px",
                  }}>₹3,999</span>
                  <span style={{ fontSize: 14, color: D.t3, textDecoration: "line-through", fontFamily: D.sans }}>₹8,000</span>
                  <span style={{
                    marginLeft: "auto", fontSize: 11, fontWeight: 800,
                    color: "#09090b", background: "linear-gradient(135deg, #ffd700 0%, #c9973a 100%)",
                    padding: "3px 10px", borderRadius: 8, fontFamily: D.sans,
                    boxShadow: "0 2px 8px rgba(201,151,58,0.3)",
                  }}>50% off</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
