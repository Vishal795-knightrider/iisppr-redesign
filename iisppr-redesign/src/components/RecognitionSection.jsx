import { useState } from "react";
import { motion } from "framer-motion";
import { D } from "../styles/theme";
import { RECOGNITION_CARDS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Recognition and awards section component with GSSoC clean light aesthetic & prestigious gold accents
export function RecognitionSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Floating classes for antigravity floating physics
  const floatClasses = [
    "animate-float",
    "animate-float-slow",
    "animate-float-delayed",
  ];

  const stripGradients = [
    "linear-gradient(90deg, #f59e0b, #d97706)",
    "linear-gradient(90deg, #1FB6A6, #5EEAD4)",
    "linear-gradient(90deg, #6366f1, #818cf8)",
  ];

  return (
    <section id="recognition" style={{
      background: "#F8FAFC",
      position: "relative",
      overflow: "hidden",
      paddingTop: 100,
      paddingBottom: 100,
      borderTop: "1px solid #E2E8F0",
    }}>
      <GridBg opacity={0.04} />
      
      {/* Soft ambient glows */}
      <div style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700,
        background: "radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <Reveal style={{ textAlign: "center", marginBottom: 65 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3"
            style={{
              background: "rgba(245, 158, 11, 0.09)",
              border: "1.5px solid rgba(245, 158, 11, 0.25)",
            }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.5px", color: "#d97706", textTransform: "uppercase", fontFamily: D.sans }}>
              🏆 Recognition & Awards
            </span>
          </div>

          <h2 style={{
            fontFamily: D.sans, fontSize: "clamp(32px, 4.8vw, 54px)",
            fontWeight: 900, letterSpacing: "-1.8px",
            color: D.t0, margin: "14px 0 12px", lineHeight: 1.08,
          }}>
            Think critically.
            <span style={{
              display: "block",
              background: "linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #1FB6A6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Write boldly. Compete for the Gold.</span>
          </h2>

          <p style={{ fontSize: 16, color: D.t2, maxWidth: 500, margin: "0 auto", lineHeight: 1.75, fontFamily: D.sans }}>
            Excellence is recognized at every level — from a certificate of completion to a Gold Medal and global publication.
          </p>
        </Reveal>

        {/* Benefits & Recognition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch recognition-grid">
          {RECOGNITION_CARDS.map((card, i) => {
            const isGold = i === 0;
            const isHovered = hoveredIdx === i;
            const floatClass = floatClasses[i % floatClasses.length];

            return (
              <Reveal key={card.title} delay={i * 0.12} className="h-full">
                <div
                  className={`h-full ${floatClass}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <motion.div
                    animate={{
                      y: isHovered ? -12 : 0,
                      scale: isHovered ? 1.015 : 1,
                    }}
                    transition={{ duration: 0.32 }}
                    className="rounded-[26px] p-8 sm:p-9 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.92)",
                      backdropFilter: "blur(28px) saturate(1.8)",
                      WebkitBackdropFilter: "blur(28px) saturate(1.8)",
                      border: isGold
                        ? (isHovered ? "1.5px solid rgba(245, 158, 11, 0.6)" : "1.5px solid rgba(245, 158, 11, 0.3)")
                        : (isHovered ? "1.5px solid rgba(31, 182, 166, 0.5)" : "1.5px solid rgba(226, 232, 240, 0.9)"),
                      boxShadow: isHovered
                        ? "0 28px 56px rgba(11, 16, 38, 0.10), inset 0 1.5px 0 rgba(255,255,255,1)"
                        : "0 16px 40px rgba(11, 16, 38, 0.05), inset 0 1.5px 0 rgba(255,255,255,1)",
                    }}
                  >
                    <div>
                      {/* Top Accent Strip with ample breathing room */}
                      <div
                        style={{
                          height: 4,
                          borderRadius: 4,
                          width: 44,
                          marginBottom: 20,
                          background: stripGradients[i],
                        }}
                      />

                      {/* Icon */}
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl mb-4.5"
                        style={{
                          background: isGold ? "rgba(245, 158, 11, 0.10)" : "rgba(31, 182, 166, 0.08)",
                          border: isGold ? "1px solid rgba(245, 158, 11, 0.22)" : "1px solid rgba(31, 182, 166, 0.2)",
                        }}
                      >
                        {card.icon}
                      </div>

                      {/* Subtitle */}
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          fontFamily: D.sans,
                          marginBottom: 8,
                          color: isGold ? "#d97706" : D.teal,
                        }}
                      >
                        {card.subtitle}
                      </div>

                      {/* Title */}
                      <div
                        style={{
                          fontFamily: D.sans,
                          fontSize: 22,
                          fontWeight: 800,
                          letterSpacing: "-0.4px",
                          marginBottom: 12,
                          color: D.t0,
                        }}
                      >
                        {card.title}
                      </div>

                      <p style={{ fontSize: 13.5, color: D.t2, lineHeight: 1.75, fontFamily: D.sans, marginBottom: 24 }}>
                        {card.body}
                      </p>
                    </div>
                    
                    {/* Benefits bullet points with generous margins and padding */}
                    <div className="flex flex-col gap-3 pt-5 pb-2 border-t border-slate-100">
                      {card.bullets.map(b => (
                        <div key={b} className="flex gap-3 items-start">
                          <span
                            style={{
                              color: isGold ? "#d97706" : D.teal,
                              fontSize: 13,
                              flexShrink: 0,
                              marginTop: 2,
                              fontWeight: 900,
                            }}
                          >
                            ✦
                          </span>
                          <span style={{ fontSize: 13, color: D.t1, fontFamily: D.sans, lineHeight: 1.5, fontWeight: 500 }}>
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
