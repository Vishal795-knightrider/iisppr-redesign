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
        <span className="text-base sm:text-lg select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
          {stat.icon}
        </span>
        <div className="flex flex-col text-left">
          <div style={{
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 800,
            color: D.t0,
            lineHeight: 1.1,
            fontFamily: D.sans,
            letterSpacing: "-0.5px",
          }}>
            {count.toLocaleString()}{stat.suffix}
          </div>
          <div style={{
            fontSize: 10.5,
            color: D.t2,
            fontFamily: D.sans,
            letterSpacing: "0.2px",
            whiteSpace: "nowrap",
            fontWeight: 500,
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
        fontSize: 26, fontWeight: 800, color: D.t0, lineHeight: 1,
        fontFamily: D.sans, letterSpacing: "-0.5px",
      }}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div style={{ fontSize: 12, color: D.t2, marginTop: 4, fontFamily: D.sans, fontWeight: 500 }}>{stat.label}</div>
    </div>
  );
}

// Hero section component inspired by GSSoC clean light aesthetic & Apple Glassmorphism
export function Hero() {
  const stagger = {
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const child = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
  };

  return (
    <>
      <section id="program" style={{
        position: "relative", overflow: "hidden",
        background: "#ffffff",
        paddingTop: "clamp(110px, 16vh, 155px)",
        paddingBottom: "clamp(60px, 9vh, 95px)",
      }}>
        <GridBg opacity={0.05} />
        
        {/* GSSoC-inspired luminous radial gradient orbs (Teal, Mint, Soft Indigo) */}
        <div style={{
          position: "absolute", top: "-10%", right: "-10%", width: 900, height: 900,
          background: "radial-gradient(ellipse, rgba(31,182,166,0.22) 0%, rgba(94,234,212,0.14) 30%, rgba(31,182,166,0.03) 60%, transparent 75%)",
          filter: "blur(75px)", pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", left: "-10%", width: 700, height: 650,
          background: "radial-gradient(ellipse at 30% 70%, rgba(71,94,196,0.16) 0%, rgba(49,68,150,0.08) 35%, transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
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
              <motion.div variants={child} style={{ marginBottom: 20 }}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(31, 182, 166, 0.08)",
                    border: "1.5px solid rgba(31, 182, 166, 0.25)",
                  }}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-[#1FB6A6] animate-ping" />
                  <span style={{
                    fontSize: 12, fontWeight: 700, letterSpacing: "0.5px",
                    color: D.teal, textTransform: "uppercase", fontFamily: D.sans,
                  }}>
                    🚀 March Cohort — Enrollment Open
                  </span>
                </div>
              </motion.div>

              {/* Main Headline with GSSoC Bold Typography & Vibrant Teal Highlight */}
              <motion.h1 variants={child} style={{
                fontFamily: D.sans,
                fontSize: "clamp(38px, 5.8vw, 70px)",
                fontWeight: 900, lineHeight: 1.05,
                letterSpacing: "-2.5px", color: D.t0,
                margin: "0 0 22px", maxWidth: 660,
              }}>
                Quantitative{" "}
                <span style={{
                  color: D.teal,
                  position: "relative",
                  display: "inline-block",
                }}>
                  Research
                  <span
                    style={{
                      position: "absolute",
                      bottom: 4,
                      left: 0,
                      right: 0,
                      height: 4,
                      borderRadius: 2,
                      background: "linear-gradient(90deg, #1FB6A6, #5EEAD4)",
                    }}
                  />
                </span>
                {" "}&amp;{" "}
                <span style={{
                  background: "linear-gradient(90deg, #1FB6A6 0%, #4F46E5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Data Science</span>
              </motion.h1>

              <motion.p variants={child} style={{
                fontSize: "clamp(15px, 1.8vw, 17px)", color: D.t1,
                lineHeight: 1.75, maxWidth: 510, margin: "0 0 34px",
                fontFamily: D.sans, fontWeight: 400,
              }}>
                A 60-day intensive online program blending public policy, data science, and AI-driven governance. Think critically. Research boldly. Get published.
              </motion.p>

              {/* Call to action buttons */}
              <motion.div variants={child} style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
                <motion.a href="#pricing"
                  whileHover={{ scale: 1.03, translateY: -2, boxShadow: "0 10px 25px rgba(11, 16, 38, 0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 32px", borderRadius: 99,
                    background: D.indigo,
                    color: "#ffffff", fontSize: 15, fontWeight: 700,
                    textDecoration: "none", fontFamily: D.sans,
                    letterSpacing: "-0.1px",
                    boxShadow: "0 6px 20px rgba(11, 16, 38, 0.18)",
                  }}>
                  View Enrollment Offers <span style={{ fontSize: 16 }}>→</span>
                </motion.a>
                <motion.a href="#curriculum"
                  whileHover={{ scale: 1.02, translateY: -2, borderColor: D.teal, color: D.teal }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 28px", borderRadius: 99,
                    background: "#ffffff",
                    border: "1.5px solid #cbd5e1",
                    color: D.t0, fontSize: 15, fontWeight: 600,
                    textDecoration: "none", fontFamily: D.sans,
                    transition: "all 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}>Explore Curriculum</motion.a>
              </motion.div>

              {/* Glowing Pill-Shaped Glassmorphism Stats Bar Floating Below Text */}
              <motion.div
                variants={child}
                className="animate-float"
                style={{
                  marginBottom: 34,
                  maxWidth: 620,
                }}
              >
                <div
                  className="rounded-3xl sm:rounded-full p-2.5 sm:p-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(24px) saturate(1.8)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.8)",
                    border: "1.5px solid rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 16px 40px rgba(11, 16, 38, 0.08), inset 0 1.5px 0 rgba(255, 255, 255, 1)",
                  }}
                >
                  {HERO_STATS.map((s, idx) => (
                    <div key={s.label} className="flex items-center flex-1 min-w-[120px] sm:min-w-0 justify-center">
                      <StatCounter stat={s} isPill={true} />
                      {idx < HERO_STATS.length - 1 && (
                        <div className="hidden sm:block w-[1px] h-7 bg-slate-200 mx-1 flex-shrink-0" />
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
                      padding: "6px 14px", borderRadius: 99,
                      background: "rgba(255, 255, 255, 0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(11, 16, 38, 0.08)",
                      fontSize: 12, color: D.t1, fontFamily: D.sans, fontWeight: 600,
                      boxShadow: "0 2px 8px rgba(11, 16, 38, 0.04)",
                    }}>
                    <span style={{ fontSize: 13 }}>{b.icon}</span>{b.text}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side floating card with GSSoC Crisp Frosted Glass Style */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="hero-card animate-float-delayed"
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.82)",
                  backdropFilter: "blur(28px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(28px) saturate(1.8)",
                  border: "1.5px solid rgba(255, 255, 255, 0.95)",
                  borderRadius: 22,
                  padding: "28px 24px",
                  boxShadow: "0 24px 64px rgba(11, 16, 38, 0.10), inset 0 1.5px 0 rgba(255, 255, 255, 1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* GSSoC Top Gradient Accent Strip */}
                <div style={{
                  height: 3.5, borderRadius: 3, width: 40,
                  marginBottom: 14,
                  background: "linear-gradient(90deg, #1FB6A6, #5EEAD4)",
                }} />

                <div style={{
                  fontSize: 10, fontWeight: 700, color: D.t3,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  fontFamily: D.sans, marginBottom: 18,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span>Program at a Glance</span>
                  <span className="w-2 h-2 rounded-full bg-[#1FB6A6] animate-ping" />
                </div>

                {HERO_STATS.map((s, i) => (
                  <div key={s.label} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    paddingBottom: i < HERO_STATS.length - 1 ? 12 : 0,
                    marginBottom: i < HERO_STATS.length - 1 ? 12 : 0,
                    borderBottom: i < HERO_STATS.length - 1 ? "1px solid rgba(11, 16, 38, 0.06)" : "none",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: "rgba(31, 182, 166, 0.08)",
                      border: "1px solid rgba(31, 182, 166, 0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, flexShrink: 0,
                    }}>{s.icon}</div>
                    <div>
                      <StatCounter stat={s} />
                    </div>
                  </div>
                ))}

                <div style={{ height: 1, background: "rgba(11, 16, 38, 0.06)", margin: "20px 0" }} />

                {/* Pre-launch pill */}
                <div style={{
                  padding: "14px 16px", borderRadius: 16,
                  background: "rgba(245, 158, 11, 0.08)",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  boxShadow: "0 4px 16px rgba(245, 158, 11, 0.08)",
                }}>
                  <div style={{
                    fontSize: 10.5, color: "#d97706", fontWeight: 800,
                    fontFamily: D.sans, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6,
                  }}>
                    ⏳ Pre-Launch Offer
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{
                      fontFamily: D.sans, fontSize: 26, fontWeight: 900,
                      color: D.t0, letterSpacing: "-1px",
                    }}>₹3,999</span>
                    <span style={{ fontSize: 14, color: D.t3, textDecoration: "line-through", fontFamily: D.sans }}>₹8,000</span>
                    <span style={{
                      marginLeft: "auto", fontSize: 11, fontWeight: 700,
                      color: "#ffffff", background: "#d97706",
                      padding: "2px 8px", borderRadius: 99, fontFamily: D.sans,
                    }}>50% off</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GSSoC-style Continuous Ticker / Marquee Banner */}
      <div style={{
        background: "#F8FAFC",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
        padding: "16px 0",
        overflow: "hidden",
      }}>
        <div className="animate-marquee">
          {[
            "Quantitative Research",
            "Data Science & AI",
            "60-Day Intensive",
            "ISBN Publication",
            "Gold Medal Program",
            "Government Recognized",
            "UN SDG Aligned",
            "Think Critically. Research Boldly.",
            "Quantitative Research",
            "Data Science & AI",
            "60-Day Intensive",
            "ISBN Publication",
            "Gold Medal Program",
            "Government Recognized",
            "UN SDG Aligned",
            "Think Critically. Research Boldly.",
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-8 whitespace-nowrap text-xs font-bold uppercase tracking-wider text-slate-500"
              style={{ fontFamily: D.sans }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FB6A6] flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
