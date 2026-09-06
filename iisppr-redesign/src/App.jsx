import { D } from "./styles/theme";

// Components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PricingSection } from "./components/PricingSection";
import { CurriculumSection } from "./components/CurriculumSection";
import { RecognitionSection } from "./components/RecognitionSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCTA } from "./components/FinalCTA";

// Main application component with GSSoC-inspired clean aesthetic & Apple Glassmorphism
export default function App() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", overflowX: "hidden", color: D.t0 }}>
      {/* Global CSS block */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100..900;1,100..900&family=Inter:wght@400;500;600;700;800&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700,800,900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #ffffff; color: #0B1026; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: rgba(31,182,166,0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(31,182,166,0.6); }

        a { cursor: pointer; }
        button { cursor: pointer; font-family: inherit; }

        /* Responsive breakpoints */
        @media (max-width: 900px) {
          .hero-grid      { grid-template-columns: 1fr !important; gap: 3rem 0 !important; }
          .pricing-grid   { grid-template-columns: 1fr !important; }
          .curriculum-layout { grid-template-columns: 1fr !important; }
          .recognition-grid  { grid-template-columns: 1fr !important; }
          .outcomes-grid     { grid-template-columns: 1fr !important; }
          
          /* Navbar mobile toggles */
          .desktop-nav-links, .desktop-nav-cta { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
          .navbar-container { width: calc(100% - 2rem) !important; border-radius: 16px !important; }
        }
        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Assembly of page sections */}
      <Navbar />
      <Hero />
      <PricingSection />
      <CurriculumSection />
      <RecognitionSection />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}