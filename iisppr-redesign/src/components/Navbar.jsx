import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { D, ease } from "../styles/theme";
import { NAV_LINKS } from "../data/constants";
import IISPPRLogo from "./IISPPRLogo";

// Navbar component with GSSoC-inspired light pill-shaped floating glassmorphism
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        display: "flex", justifyContent: "center",
        padding: scrolled ? "10px 0" : "18px 0",
        transition: "padding 0.4s ease",
        pointerEvents: "none",
      }}>
        <motion.nav
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          style={{
            pointerEvents: "all",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 0,
            padding: "8px 10px 8px 16px",
            borderRadius: 999,
            background: scrolled
              ? "rgba(255, 255, 255, 0.92)"
              : "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(28px) saturate(1.8)",
            WebkitBackdropFilter: "blur(28px) saturate(1.8)",
            border: "1px solid rgba(11, 16, 38, 0.08)",
            boxShadow: scrolled
              ? "0 16px 40px rgba(11, 16, 38, 0.10), inset 0 1.5px 0 rgba(255, 255, 255, 1)"
              : "0 8px 30px rgba(11, 16, 38, 0.06), inset 0 1.5px 0 rgba(255, 255, 255, 1)",
            transition: "all 0.35s ease",
            maxWidth: "calc(100vw - 2rem)",
            width: "fit-content",
          }}
          className="navbar-container"
        >
          {/* Logo block */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 22, paddingRight: 20, borderRight: "1px solid rgba(11, 16, 38, 0.08)" }}>
            <IISPPRLogo size={0.5} compact={true} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{
                fontSize: 15, fontWeight: 900, color: D.t0,
                fontFamily: D.sans, letterSpacing: "-0.3px",
              }}>IISPPR</span>
              <span style={{
                fontSize: 8.5, fontWeight: 800, color: D.teal,
                fontFamily: D.sans, letterSpacing: "1px",
              }}>ACADEMY</span>
            </div>
          </div>

          {/* Desktop navigation links */}
          <div className="desktop-nav-links" style={{ display: "flex", gap: 4 }}>
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                style={{
                  fontSize: 13.5, fontWeight: 600, color: D.t2,
                  textDecoration: "none", padding: "6px 14px", borderRadius: 99,
                  fontFamily: D.sans, transition: "all 0.2s",
                  letterSpacing: "-0.1px",
                }}
                onMouseEnter={e => { e.target.style.background = "rgba(31, 182, 166, 0.08)"; e.target.style.color = D.teal; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = D.t2; }}
              >{link}</a>
            ))}
          </div>

          {/* Desktop enrollment CTA button */}
          <motion.a
            href="#pricing"
            className="desktop-nav-cta"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(31, 182, 166, 0.35)" }}
            whileTap={{ scale: 0.96 }}
            style={{
              marginLeft: 12,
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "9px 20px", borderRadius: 99,
              background: "linear-gradient(135deg, #1FB6A6 0%, #2EC4B6 100%)",
              color: "#ffffff", fontSize: 13, fontWeight: 700,
              textDecoration: "none", fontFamily: D.sans,
              letterSpacing: "-0.1px",
              boxShadow: "0 4px 14px rgba(31, 182, 166, 0.25)",
            }}
          >Enroll Now →</motion.a>

          {/* Mobile hamburger menu toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "transparent", border: "none", color: D.t0,
              display: "none", alignItems: "center", justifyContent: "center",
              padding: "4px", marginLeft: "auto"
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile navigation menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: scrolled ? 68 : 74, left: "1rem", right: "1rem", zIndex: 998,
              background: "rgba(255, 255, 255, 0.96)",
              backdropFilter: "blur(28px) saturate(1.8)",
              border: "1px solid rgba(11, 16, 38, 0.10)",
              borderRadius: 20,
              padding: "18px",
              boxShadow: "0 20px 50px rgba(11, 16, 38, 0.12)",
              display: "flex", flexDirection: "column", gap: 8
            }}
            className="mobile-nav-menu"
          >
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: 15, fontWeight: 600, color: D.t0,
                  textDecoration: "none", padding: "12px 16px", borderRadius: 12,
                  fontFamily: D.sans, transition: "background 0.2s",
                  background: "rgba(11, 16, 38, 0.03)"
                }}
              >{link}</a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "14px 18px", borderRadius: 12, marginTop: 8,
                background: "linear-gradient(135deg, #1FB6A6 0%, #2EC4B6 100%)",
                color: "#ffffff", fontSize: 15, fontWeight: 700,
                textDecoration: "none", fontFamily: D.sans,
                boxShadow: "0 4px 14px rgba(31, 182, 166, 0.25)",
              }}
            >Enroll Now →</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
