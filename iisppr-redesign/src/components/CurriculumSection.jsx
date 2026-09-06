import { useState } from "react";
import { motion } from "framer-motion";
import { D, ease } from "../styles/theme";
import { PHASES, OUTCOMES } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Curriculum timeline section component inspired by GSSoC with Connected Winding Timeline
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
      background: "#ffffff",
      position: "relative",
      overflow: "hidden",
      paddingTop: 100,
      paddingBottom: 100,
      borderTop: "1px solid #E2E8F0",
    }}>
      <GridBg opacity={0.04} />
      
      {/* Ambient background glows */}
      <div style={{
        position: "absolute", top: "15%", right: "-5%", width: 650, height: 650,
        background: "radial-gradient(circle, rgba(31,182,166,0.12) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-5%", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>

        {/* Section Header */}
        <Reveal style={{ marginBottom: 65, textAlign: "center" }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3"
            style={{
              background: "rgba(31, 182, 166, 0.08)",
              border: "1.5px solid rgba(31, 182, 166, 0.25)",
            }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.5px", color: D.teal, textTransform: "uppercase", fontFamily: D.sans }}>
              📚 18 Power-Packed Lectures
            </span>
          </div>
          <h2 style={{
            fontFamily: D.sans, fontSize: "clamp(32px, 4.8vw, 54px)",
            fontWeight: 900, letterSpacing: "-1.8px",
            color: D.t0, margin: "14px 0 12px", lineHeight: 1.08,
          }}>
            Course Roadmap
          </h2>
          <p style={{ fontSize: 16, color: D.t2, maxWidth: 540, margin: "0 auto", lineHeight: 1.75, fontFamily: D.sans }}>
            60 days of structured learning — from policy foundations to advanced data science applications and capstone delivery.
          </p>
        </Reveal>

        {/* Connected Winding Glowing Path & Timeline */}
        <div className="relative my-8">

          {/* Connected central line on desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-1 rounded-full pointer-events-none z-0"
            style={{
              background: "linear-gradient(to bottom, #1FB6A6 0%, #3B82F6 40%, #6366f1 75%, #f43f5e 100%)",
              boxShadow: "0 0 12px rgba(31, 182, 166, 0.4)",
            }}
          />

          {/* Mobile vertical line */}
          <div
            className="block md:hidden absolute left-5 top-6 bottom-6 w-1 rounded-full pointer-events-none z-0"
            style={{
              background: "linear-gradient(to bottom, #1FB6A6 0%, #3B82F6 40%, #6366f1 75%, #f43f5e 100%)",
            }}
          />

          {/* Nodes along the path */}
          <div className="flex flex-col gap-10 md:gap-14 relative z-10">
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
                      className="rounded-[22px] p-6 md:p-7 relative overflow-hidden transition-all duration-300"
                      style={{
                        background: "rgba(255, 255, 255, 0.88)",
                        backdropFilter: "blur(28px) saturate(1.8)",
                        WebkitBackdropFilter: "blur(28px) saturate(1.8)",
                        border: isHovered ? `1.5px solid ${phase.color}` : "1.5px solid rgba(226, 232, 240, 0.9)",
                        boxShadow: isHovered
                          ? "0 24px 50px rgba(11, 16, 38, 0.10), inset 0 1.5px 0 rgba(255,255,255,1)"
                          : "0 14px 36px rgba(11, 16, 38, 0.05), inset 0 1.5px 0 rgba(255,255,255,1)",
                        transform: isHovered ? "translateY(-4px)" : "none",
                      }}
                    >
                      {/* Top Accent Strip */}
                      <div
                        style={{
                          height: 3.5,
                          borderRadius: 3,
                          width: 38,
                          marginBottom: 14,
                          background: phase.color,
                        }}
                      />

                      {/* Phase Header Banner */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div>
                          <div
                            style={{
                              fontSize: 17,
                              fontWeight: 800,
                              color: D.t0,
                              fontFamily: D.sans,
                              letterSpacing: "-0.3px",
                            }}
                          >
                            {phase.label} Phase
                          </div>
                          <div style={{ fontSize: 12, color: D.t2, fontFamily: D.sans, fontWeight: 500 }}>
                            {phase.weeks}
                          </div>
                        </div>

                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: phase.soft,
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
                            className="flex items-start gap-3.5 p-3.5 rounded-xl transition-all duration-200 group hover:bg-[#F8FAFC]"
                            style={{
                              background: "#F8FAFC",
                              border: "1px solid #E2E8F0",
                            }}
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black"
                              style={{
                                background: "#ffffff",
                                border: "1px solid #E2E8F0",
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
                              <div style={{ fontSize: 11, color: D.t3, marginTop: 2, fontFamily: D.sans, fontWeight: 500 }}>
                                Lecture {mi + 1} · 2–3 hrs
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Connected Timeline Marker Node */}
                  <div
                    className="absolute md:static left-5 -translate-x-1/2 md:translate-x-0 z-20 flex items-center justify-center"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center relative bg-white shadow-md border-2"
                      style={{
                        borderColor: phase.color,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
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

        {/* Learning Outcomes in Clean Card */}
        <Reveal delay={0.2} style={{ marginTop: 60 }}>
          <div
            className="rounded-[22px] p-7 sm:p-9 relative overflow-hidden"
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
            }}
          >
            <div className="flex items-center gap-3.5 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-xs"
                style={{
                  background: "rgba(31, 182, 166, 0.12)",
                  border: "1px solid rgba(31, 182, 166, 0.25)",
                }}
              >
                🎯
              </div>
              <div style={{ fontFamily: D.sans, fontSize: 19, fontWeight: 800, color: D.t0, letterSpacing: "-0.3px" }}>
                By the end, you'll be able to:
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-x-8 sm:gap-y-3 outcomes-grid">
              {OUTCOMES.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="flex gap-2.5 items-start p-2 rounded-lg"
                >
                  <span style={{ color: D.teal, fontSize: 14, flexShrink: 0, marginTop: 1, fontWeight: 900 }}>✓</span>
                  <span style={{ fontSize: 13.5, color: D.t1, lineHeight: 1.6, fontFamily: D.sans, fontWeight: 500 }}>{o}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
