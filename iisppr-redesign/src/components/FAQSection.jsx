import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { D } from "../styles/theme";
import { FAQS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// FAQ accordion section component with Apple Frosted Glass
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" style={{
      background: D.bg,
      position: "relative",
      overflow: "hidden",
      paddingTop: 110,
      paddingBottom: 110,
      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    }}>
      <GridBg opacity={0.015} />
      
      {/* Radiant blurred orbs */}
      <Orb x="15%" y="60%" r={550} color={D.purpleGl} opacity={0.25} blur={90} anim="animate-pulse-glow" />
      <Orb x="85%" y="75%" r={500} color={D.cyanGl} opacity={0.20} blur={85} anim="animate-float-slow" />

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(168,85,247,0.15)] mb-3">
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.6px", color: D.lav, textTransform: "uppercase", fontFamily: D.sans }}>
              ❓ Got Questions?
            </span>
          </div>
          <h2 style={{
            fontFamily: D.serif, fontSize: "clamp(32px, 4.8vw, 50px)",
            fontWeight: 900, letterSpacing: "-1.5px",
            color: D.t0, margin: "16px 0 14px", lineHeight: 1.08,
          }}>
            Frequently Asked Questions
          </h2>
        </Reveal>

        {/* Accordion container with Frosted Glass */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? "rgba(255, 255, 255, 0.07)" : "rgba(255, 255, 255, 0.035)",
                  backdropFilter: "blur(24px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.8)",
                  border: isOpen ? "1px solid rgba(168, 85, 247, 0.4)" : "1px solid rgba(255, 255, 255, 0.09)",
                  boxShadow: isOpen
                    ? "0 16px 36px rgba(0,0,0,0.4), 0 0 24px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
                    : "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* Accordion header / trigger */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%", textAlign: "left", padding: "22px 26px",
                    background: "transparent", border: "none",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    cursor: "pointer", color: isOpen ? D.t0 : D.t1,
                  }}
                >
                  <span style={{ fontFamily: D.sans, fontSize: 16.5, fontWeight: 600, paddingRight: 20, letterSpacing: "-0.2px" }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                    background: isOpen ? "rgba(168, 85, 247, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    border: isOpen ? "1px solid rgba(168, 85, 247, 0.5)" : "1px solid rgba(255, 255, 255, 0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isOpen ? D.lav : D.t2, transition: "all 0.3s",
                    boxShadow: isOpen ? "0 0 12px rgba(168, 85, 247, 0.3)" : "none",
                  }}>
                    {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                  </div>
                </button>
                
                {/* Accordion content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div style={{
                        padding: "0 26px 26px", color: D.t1,
                        fontSize: 14.5, lineHeight: 1.75, fontFamily: D.sans,
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
