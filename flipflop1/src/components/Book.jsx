import React from "react";
import Page from "./Page";
import ScrollProgress from "./ScrollProgress";
import { PAGES } from "../data/bookContent";
import { useBookScroll } from "../hooks/useBookScroll";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Book({ scrollY, viewportH, logoLanded = true, scrollToPage }) {
  const totalPages = PAGES.length;
  
  const {
    currentPageIndex,
    progressDots,
    getPageStyle
  } = useBookScroll({ scrollY, viewportH, totalPages });

  return (
    <section
      style={{
        height: `${totalPages * 100}vh`, // 700vh total height scroll track
        background: "#0a0806",
        position: "relative",
      }}
    >
      {/* Sticky viewport container */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "60px 20px",
      }}>
        <div style={{
          position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: "100%", height: 1,
            background: "linear-gradient(to right, transparent, rgba(200,169,110,0.2), transparent)",
          }} />
        </div>

        <div style={{
          textAlign: "center",
          marginBottom: 48,
          opacity: 1,
          transform: "translateY(0)",
          transition: "none",
        }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8A96E", opacity: 0.6, marginBottom: 10 }}>
            Publications
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 300,
            color: "#f5f0e8",
            letterSpacing: "0.02em",
          }}>
            Annual Research Compendium
          </h2>
        </div>

        {/* Book widget */}
        <div
          style={{
            position: "relative",
            width: "min(380px, 90vw)",
            height: "min(540px, 75vh)",
            opacity: 1,
            transform: "translateY(0)",
            transition: "none",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.7))",
            pointerEvents: "none",
          }}>
            {/* Spine */}
            <div style={{
              position: "absolute",
              left: -12, top: 8, bottom: 8, width: 24,
              background: "linear-gradient(to right, #1e150a 0%, #2e2010 40%, #251a0d 100%)",
              borderRadius: "3px 0 0 3px",
              zIndex: 100,
            }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{
                  position: "absolute", left: 0, right: 0, height: 1,
                  top: `${(i + 1) * 5.3}%`,
                  background: "#C8A96E",
                  opacity: 0.15,
                }} />
              ))}
            </div>

            {PAGES.map((page, index) => {
              const isActive = index === currentPageIndex;
              const isPrev = index === currentPageIndex - 1;
              const pageClick = () => {
                if (isActive && index < totalPages - 1) {
                  scrollToPage && scrollToPage(index + 1);
                } else if (isPrev) {
                  scrollToPage && scrollToPage(index);
                }
              };
              const pageCursor = (isActive && index < totalPages - 1) || isPrev ? "pointer" : "default";

              return (
                <Page
                  key={page.id}
                  page={page}
                  style={getPageStyle(index)}
                  zIndex={isActive ? 10 : 5}
                  logoLanded={logoLanded}
                  onClick={pageClick}
                  cursor={pageCursor}
                />
              );
            })}
          </div>

          {/* Left/Prev Page Button */}
          {currentPageIndex > 0 && (
            <button
              onClick={() => scrollToPage && scrollToPage(currentPageIndex - 1)}
              className="nav-turn-btn nav-turn-btn-prev"
              aria-label="Previous Page"
            >
              <ChevronLeft size={20} strokeWidth={1.8} />
            </button>
          )}

          {/* Right/Next Page Button */}
          {currentPageIndex < totalPages - 1 && (
            <button
              onClick={() => scrollToPage && scrollToPage(currentPageIndex + 1)}
              className="nav-turn-btn nav-turn-btn-next"
              aria-label="Next Page"
            >
              <ChevronRight size={20} strokeWidth={1.8} />
            </button>
          )}

          {/* Progress dots */}
          <ScrollProgress progressDots={progressDots} pages={PAGES} scrollToPage={scrollToPage} />

          <div style={{
            position: "absolute",
            top: -30,
            right: 0,
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#f5f0e8",
            opacity: 0.25,
            fontFamily: "Georgia, serif",
            pointerEvents: "none",
          }}>
            {Math.min(currentPageIndex + 1, totalPages)} / {totalPages}
          </div>
        </div>

        <div style={{
          marginTop: 80,
          textAlign: "center",
          opacity: currentPageIndex === 0 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: "#f5f0e8", opacity: 0.3, letterSpacing: "0.1em" }}>
            Scroll down to explore chapters
          </p>
        </div>
      </div>
    </section>
  );
}
