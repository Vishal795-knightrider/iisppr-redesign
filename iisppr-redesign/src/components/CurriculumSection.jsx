import { useState } from "react";
import { motion } from "framer-motion";
import { D, ease } from "../styles/theme";
import { PHASES, OUTCOMES } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Curriculum timeline section component with Connected Winding Glowing Path & Floating Glass Nodes
export function CurriculumSection() {
  const [hoveredPhase, setHoveredPhase] = useState(null);

  // Floating classes for antigravity feel
  const floatClasses = [
    "animate-float",
    "animate-float-delayed",
    "animate-float-slow",
    "animate-float-reverse",
  ];

  return (
    <section id="curriculum" style={{
      background: D.bg,
      position: "relative",
      overflow: "hidden",
      paddingTop: 110,
      paddingBottom: 110,
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    }}>
      <GridBg opacity={0.022} />
      
      {/* Apple-style blurred glowing orbs */}
      <Orb x="85%" y="25%" r={550} color={D.purpleGl} opacity={0.25} blur={90} anim="animate-pulse-glow" />
      <Orb x="15%" y="60%" r={600} color={D.cyanGl} opacity={0.22} blur={95} anim="animate-float-slow" />
      <Orb x="70%" y="85%" r={500} color={D.orangeGl} opacity={0.20} blur={85} anim="animate-float-reverse" />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>

        {/* Section Header */}
        <Reveal style={{ marginBottom: 70, textAlign: "center" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(6,182,212,0.15)] mb-3">
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.6px", color: D.sageBr, textTransform: "uppercase", fontFamily: D.sans }}>
              📚 18 Power-Packed Lectures
            </span>
          </div>
          <h2 style={{
            fontFamily: D.serif, fontSize: "clamp(34px, 5vw, 56px)",
            fontWeight: 900, letterSpacing: "-1.8px",
            color: D.t0, margin: "16px 0 14px", lineHeight: 1.08,
          }}>
            Course Roadmap
          </h2>
          <p style={{ fontSize: 16, color: D.t2, maxWidth: 540, margin: "0 auto", lineHeight: 1.75, fontFamily: D.sans }}>
            60 days of structured learning — from policy foundations to advanced data science applications and capstone delivery.
          </p>
        </Reveal>

        {/* Connected Winding Glowing Path & Timeline */}
        <div className="relative my-8">

          {/* Glowing central path line (visible on desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-10 bottom-10 -translate-x-1/2 w-1 rounded-full pointer-events-none z-0"
            style={{
              background: "linear-gradient(to bottom, #5eaf8e 0%, #c9973a 35%, #a855f7 70%, #d97066 100%)",
              boxShadow: "0 0 20px rgba(245, 197, 66, 0.4), 0 0 40px rgba(168, 85, 247, 0.25)",
            }}
          />

          {/* Mobile vertical glowing path */}
          <div
            className="block md:hidden absolute left-5 top-8 bottom-8 w-1 rounded-full pointer-events-none z-0"
            style={{
              background: "linear-gradient(to bottom, #5eaf8e 0%, #c9973a 35%, #a855f7 70%, #d97066 100%)",
              boxShadow: "0 0 16px rgba(245, 197, 66, 0.4)",
            }}
          />

          {/* Nodes along the winding path */}
          <div className="flex flex-col gap-12 md:gap-16 relative z-10">
            {PHASES.map((phase, idx) => {
              const isEven = idx % 2 === 0;
              const floatClass = floatClasses[idx % floatClasses.length];
              const isHovered = hoveredPhase === idx;

              return (
                <div
                  key={phase.label}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-12`}
                >
                  {/* Floating Glass Node Content Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease }}
                    className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${floatClass}`}
                    onMouseEnter={() => setHoveredPhase(idx)}
                    onMouseLeave={() => setHoveredPhase(null)}
                  >
                    <div
                      className="rounded-[24px] p-6 md:p-7 relative overflow-hidden transition-all duration-300"
                      style={{
                        background: "rgba(255, 255, 255, 0.045)",
                        backdropFilter: "blur(28px) saturate(1.8)",
                        WebkitBackdropFilter: "blur(28px) saturate(1.8)",
                        border: `1px solid ${isHovered ? phase.color : "rgba(255, 255, 255, 0.10)"}`,
                        boxShadow: isHovered
                          ? `0 24px 60px rgba(0,0,0,0.6), 0 0 35px ${phase.soft}, inset 0 1px 0 rgba(255,255,255,0.3)`
                          : `0 16px 45px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)`,
                        transform: isHovered ? "translateY(-6px) scale(1.015)" : "none",
                      }}
                    >
                      {/* Top Specular Sheen */}
                      <div
                        className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle, ${phase.soft} 0%, transparent 70%)`,
                          opacity: isHovered ? 0.8 : 0.4,
                        }}
                      />

                      {/* Phase Header Banner */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2.5 h-8 rounded-full"
                            style={{
                              background: phase.color,
                              boxShadow: `0 0 12px ${phase.color}`,
                            }}
                          />
                          <div>
                            <div
                              style={{
                                fontSize: 16,
                                fontWeight: 800,
                                color: phase.color,
                                fontFamily: D.sans,
                                letterSpacing: "-0.2px",
                              }}
                            >
                              {phase.label} Phase
                            </div>
                            <div style={{ fontSize: 11.5, color: D.t2, fontFamily: D.sans }}>
                              {phase.weeks}
                            </div>
                          </div>
                        </div>

                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: phase.soft,
                            border: `1px solid ${phase.border}`,
                            color: phase.color,
                            fontFamily: D.sans,
                          }}
                        >
                          {phase.modules.length} Modules
                        </span>
                      </div>

                      {/* Embedded Module Nodes */}
                      <div className="flex flex-col gap-2.5">
                        {phase.modules.map((mod, mi) => (
                          <div
                            key={mod}
                            className="flex items-start gap-3.5 p-3.5 rounded-xl transition-all duration-200 group hover:bg-white/[0.06]"
                            style={{
                              background: "rgba(255, 255, 255, 0.03)",
                              backdropFilter: "blur(12px)",
                              border: "1px solid rgba(255, 255, 255, 0.06)",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            }}
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black transition-transform duration-200 group-hover:scale-110"
                              style={{
                                background: phase.soft,
                                border: `1px solid ${phase.border}`,
                                color: phase.color,
                                fontFamily: D.sans,
                              }}
                            >
                              {String(mi + 1).padStart(2, "0")}
                            </div>
                            <div className="flex-1">
                              <div
                                style={{
                                  fontSize: 13.5,
                                  fontWeight: 600,
                                  color: D.t0,
                                  fontFamily: D.sans,
                                  lineHeight: 1.45,
                                }}
                              >
                                {mod}
                              </div>
                              <div style={{ fontSize: 11, color: D.t3, marginTop: 2, fontFamily: D.sans }}>
                                Lecture {mi + 1} · 2–3 hrs
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Connected Glowing Timeline Marker / Pulsing Node */}
                  <div
                    className="absolute md:static left-5 -translate-x-1/2 md:translate-x-0 z-20 flex items-center justify-center"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center relative transition-transform duration-300 hover:scale-125"
                      style={{
                        background: "rgba(9, 9, 11, 0.9)",
                        backdropFilter: "blur(16px)",
                        border: `2px solid ${phase.color}`,
                        boxShadow: `0 0 20px ${phase.color}, inset 0 0 10px ${phase.soft}`,
                      }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full animate-ping pointer-events-none"
                        style={{ background: phase.color, opacity: 0.6 }}
                      />
                      <div
                        className="w-2.5 h-2.5 rounded-full absolute"
                        style={{ background: phase.color }}
                      />
                    </div>
                  </div>

                  {/* Desktop empty spacer for 50/50 balance */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Outcomes in Apple Frosted Glass Container */}
        <Reveal delay={0.2} style={{ marginTop: 64 }}>
          <div
            className="rounded-[24px] p-7 sm:p-9 relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(30px) saturate(1.8)",
              WebkitBackdropFilter: "blur(30px) saturate(1.8)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <div className="flex items-center gap-3.5 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm"
                style={{
                  background: "rgba(94, 175, 142, 0.15)",
                  border: "1px solid rgba(94, 175, 142, 0.35)",
                }}
              >
                🎯
              </div>
              <div style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 900, color: D.t0, letterSpacing: "-0.3px" }}>
                By the end, you'll be able to:
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-x-8 sm:gap-y-3.5 outcomes-grid">
              {OUTCOMES.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="flex gap-2.5 items-start p-2.5 rounded-xl transition-colors duration-200 hover:bg-white/[0.03]"
                >
                  <span style={{ color: D.sageBr, fontSize: 14, flexShrink: 0, marginTop: 1, fontWeight: 900 }}>✓</span>
                  <span style={{ fontSize: 13.5, color: D.t1, lineHeight: 1.6, fontFamily: D.sans }}>{o}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
