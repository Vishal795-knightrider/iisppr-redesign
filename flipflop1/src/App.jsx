import React, { useState, useEffect, useCallback, useRef } from "react";
import Book from "./components/Book";

export default function IISPPRLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(800);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=EB+Garamond:ital,wght@0,400;1,400&family=Cormorant+Garamond:wght@300;400;600&display=swap";
    document.head.appendChild(link);
    setMounted(true);
    setViewportH(window.innerHeight);
    const handleResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMainScroll = useCallback((e) => {
    setScrollY(e.target.scrollTop);
  }, []);

  const scrollToPage = useCallback((index) => {
    if (containerRef.current) {
      const targetScrollY = index * viewportH;
      containerRef.current.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  }, [viewportH]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        background: "#0a0806",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        scrollbarWidth: "none",
      }}
      onScroll={handleMainScroll}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        @keyframes grain {
          0%, 100% { transform: translate(0,0) }
          10% { transform: translate(-1%,-2%) }
          20% { transform: translate(2%,1%) }
          30% { transform: translate(-2%,3%) }
          40% { transform: translate(1%,-1%) }
          50% { transform: translate(-1%,2%) }
          60% { transform: translate(2%,-3%) }
          70% { transform: translate(-2%,1%) }
          80% { transform: translate(1%,2%) }
          90% { transform: translate(-1%,-1%) }
        }
      `}</style>

      {/* BOOK SECTION */}
      <Book
        scrollY={scrollY}
        viewportH={viewportH}
        logoLanded={true}
        scrollToPage={scrollToPage}
      />
    </div>
  );
}

