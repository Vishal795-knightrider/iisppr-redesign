import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { D } from "../styles/theme";
import { FAQS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// FAQ accordion section component with GSSoC clean light aesthetic
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" style={{
      background: "#ffffff",
      position: "relative",
      overflow: "hidden",
      paddingTop: 100,
      paddingBottom: 100,
      borderTop: "1px solid #E2E8F0",
    }}>
      <GridBg opacity={0.03} />

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 2 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 55 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3"
            style={{
              background: "rgba(31, 182, 166, 0.08)",
              border: "1.5px solid rgba(31, 182, 166, 0.25)",
            }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.5px", color: D.teal, textTransform: "uppercase", fontFamily: D.sans }}>
              ❓ Got Questions?
            </span>
          </div>
          <h2 style={{
            fontFamily: D.sans, fontSize: "clamp(30px, 4.5vw, 48px)",
            fontWeight: 900, letterSpacing: "-1.5px",
            color: D.t0, margin: "14px 0 12px", lineHeight: 1.08,
          }}>
            Frequently Asked Questions
          </h2>
        </Reveal>

        {/* Accordion container */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                  background: isOpen ? "#F8FAFC" : "#ffffff",
                  border: isOpen ? "1.5px solid #1FB6A6" : "1px solid #E2E8F0",
                  boxShadow: isOpen
                    ? "0 10px 30px rgba(31, 182, 166, 0.08)"
                    : "0 2px 8px rgba(0, 0, 0, 0.02)",
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
                  <span style={{ fontFamily: D.sans, fontSize: 16, fontWeight: 700, paddingRight: 20, letterSpacing: "-0.2px" }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                    background: isOpen ? "rgba(31, 182, 166, 0.12)" : "#F1F5F9",
                    border: isOpen ? "1px solid rgba(31, 182, 166, 0.3)" : "1px solid #E2E8F0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isOpen ? D.teal : D.t2, transition: "all 0.3s",
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
                        fontSize: 14.5, lineHeight: 1.75, fontFamily: D.sans, fontWeight: 400,
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
