import { useState } from "react";
import { motion } from "framer-motion";
import { D } from "../styles/theme";
import { RECOGNITION_CARDS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Recognition and awards section component with Prestigious Metallic Gold and Apple Frosted Glass
export function RecognitionSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Floating classes for antigravity floating physics
  const floatClasses = [
    "animate-float",
    "animate-float-slow",
    "animate-float-delayed",
  ];

  return (
    <section id="recognition" style={{
      background: D.bg,
      position: "relative",
      overflow: "hidden",
      paddingTop: 110,
      paddingBottom: 110,
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    }}>
      <GridBg opacity={0.02} />
      
      {/* Radiant blurred glowing orbs: Deep Orange, Soft Purple, Cyan */}
      <Orb x="50%" y="20%" r={650} color={D.orangeGl} opacity={0.28} blur={95} anim="animate-pulse-glow" />
      <Orb x="10%" y="75%" r={550} color={D.purpleGl} opacity={0.24} blur={90} anim="animate-float-slow" />
      <Orb x="90%" y="80%" r={500} color={D.cyanGl} opacity={0.22} blur={85} anim="animate-float-reverse" />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <Reveal style={{ textAlign: "center", marginBottom: 70 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(245,197,66,0.15)] mb-3">
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.6px", color: D.goldBr, textTransform: "uppercase", fontFamily: D.sans }}>
              🏆 Recognition & Awards
            </span>
          </div>

          <h2 style={{
            fontFamily: D.serif, fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, letterSpacing: "-1.8px",
            color: D.t0, margin: "16px 0 14px", lineHeight: 1.08,
          }}>
            Think critically.
            <span style={{
              display: "block", fontStyle: "italic",
              background: "linear-gradient(110deg, #FFF8DC 0%, #FFD700 25%, #F5C542 50%, #7dcfac 80%, #38bdf8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: "drop-shadow(0 2px 18px rgba(245, 197, 66, 0.3))",
            }}>Write boldly. Compete for the Gold.</span>
          </h2>

          <p style={{ fontSize: 16, color: D.t2, maxWidth: 500, margin: "0 auto", lineHeight: 1.75, fontFamily: D.sans }}>
            Excellence is recognized at every level — from a certificate of completion to a Gold Medal and global publication.
          </p>
        </Reveal>

        {/* Benefits & Recognition Cards Grid with Antigravity Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch recognition-grid">
          {RECOGNITION_CARDS.map((card, i) => {
            const isGold = i === 0;
            const isISBN = i === 1;
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
                      y: isHovered ? -14 : 0,
                      scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.32 }}
                    className="rounded-[24px] p-7 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300"
                    style={{
                      background: isGold
                        ? "rgba(255, 255, 255, 0.055)"
                        : "rgba(255, 255, 255, 0.04)",
                      backdropFilter: "blur(30px) saturate(1.8)",
                      WebkitBackdropFilter: "blur(30px) saturate(1.8)",
                      border: isGold
                        ? (isHovered ? "1px solid rgba(255, 215, 0, 0.6)" : "1px solid rgba(245, 197, 66, 0.35)")
                        : isISBN
                          ? (isHovered ? "1px solid rgba(125, 207, 172, 0.5)" : "1px solid rgba(94, 175, 142, 0.28)")
                          : (isHovered ? "1px solid rgba(168, 85, 247, 0.5)" : "1px solid rgba(157, 143, 220, 0.25)"),
                      boxShadow: isHovered
                        ? isGold
                          ? "0 32px 64px -10px rgba(245, 197, 66, 0.35), 0 0 45px rgba(245, 197, 66, 0.25), inset 0 1px 0 rgba(255, 248, 220, 0.45)"
                          : isISBN
                            ? "0 30px 60px -10px rgba(94, 175, 142, 0.35), 0 0 40px rgba(94, 175, 142, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.35)"
                            : "0 30px 60px -10px rgba(168, 85, 247, 0.35), 0 0 40px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.35)"
                        : isGold
                          ? "0 20px 48px rgba(0, 0, 0, 0.45), 0 0 35px rgba(245, 197, 66, 0.15), inset 0 1px 0 rgba(255, 248, 220, 0.3)"
                          : "0 20px 45px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
                    }}
                  >
                    {/* Prestigious Specular Ambient Glow Top */}
                    <div
                      className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: isGold
                          ? "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)"
                          : isISBN
                            ? "radial-gradient(circle, rgba(94,175,142,0.25) 0%, transparent 70%)"
                            : "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
                        opacity: isHovered ? 0.9 : 0.45,
                      }}
                    />

                    <div>
                      {/* Floating Icon with Metallic Frosted Ring */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300"
                        style={{
                          background: isGold
                            ? "linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(201,151,58,0.1) 100%)"
                            : card.soft,
                          border: isGold
                            ? "1px solid rgba(255, 215, 0, 0.4)"
                            : `1px solid ${card.border}`,
                          boxShadow: isGold
                            ? "0 8px 24px rgba(245, 197, 66, 0.25), inset 0 1px 0 rgba(255,248,220,0.4)"
                            : "0 6px 20px rgba(0,0,0,0.25)",
                          transform: isHovered ? "scale(1.1) rotate(4deg)" : "scale(1)",
                        }}
                      >
                        {card.icon}
                      </div>

                      {/* Subtitle Badge */}
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          fontFamily: D.sans,
                          marginBottom: 8,
                          color: isGold ? D.goldBr : card.color,
                        }}
                      >
                        {card.subtitle}
                      </div>

                      {/* Title with Rich Metallic Gold Gradient for Gold Medal, and Prestigious Silver/Emerald for ISBN */}
                      <div
                        style={{
                          fontFamily: D.serif,
                          fontSize: 23,
                          fontWeight: 900,
                          letterSpacing: "-0.5px",
                          marginBottom: 12,
                          background: isGold
                            ? "linear-gradient(135deg, #FFF8DC 0%, #FFD700 25%, #F5C542 50%, #D4AF37 75%, #996515 100%)"
                            : isISBN
                              ? "linear-gradient(135deg, #F0FDF4 0%, #7dcfac 50%, #38bdf8 100%)"
                              : "linear-gradient(135deg, #FAF5FF 0%, #c084fc 60%, #e879f9 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          filter: isGold
                            ? "drop-shadow(0 2px 10px rgba(245, 197, 66, 0.3))"
                            : "none",
                        }}
                      >
                        {card.title}
                      </div>

                      <p style={{ fontSize: 13.5, color: D.t2, lineHeight: 1.7, fontFamily: D.sans, marginBottom: 22 }}>
                        {card.body}
                      </p>
                    </div>
                    
                    {/* Benefits bullet points in frosted glass list */}
                    <div className="flex flex-col gap-2.5 pt-4 border-t border-white/[0.08]">
                      {card.bullets.map(b => (
                        <div key={b} className="flex gap-2.5 items-start">
                          <span
                            style={{
                              color: isGold ? D.goldBr : card.color,
                              fontSize: 13,
                              flexShrink: 0,
                              marginTop: 2,
                              filter: isGold ? "drop-shadow(0 0 6px rgba(245, 197, 66, 0.4))" : "none",
                            }}
                          >
                            ✦
                          </span>
                          <span style={{ fontSize: 13, color: D.t1, fontFamily: D.sans, lineHeight: 1.5 }}>
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
