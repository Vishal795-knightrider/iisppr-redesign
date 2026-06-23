export function useBookScroll({ scrollY, viewportH, totalPages }) {
  // Global scroll-to-book-progress translation
  const bookScrollStart = 0;
  const bookScrollLength = (totalPages - 1) * viewportH;
  
  const bookScrollProgress = scrollY >= bookScrollStart
    ? Math.max(0, Math.min(1, (scrollY - bookScrollStart) / bookScrollLength))
    : 0;

  const currentPageFloat = bookScrollProgress * (totalPages - 1);
  const currentPageIndex = Math.floor(currentPageFloat);
  const pageProgress = currentPageFloat - currentPageIndex;

  const getPageStyle = (index) => {
    // Keep only left page, active turning page, and right page to eliminate visual ghost layers
    if (index < currentPageIndex - 1 || index > currentPageIndex + 1) {
      return { display: "none" };
    }

    if (index === currentPageIndex - 1) {
      return { 
        transform: "perspective(1200px) rotateY(-165deg)", 
        opacity: 1, 
        transition: "none" 
      };
    }

    if (index === currentPageIndex) {
      const angle = -165 * pageProgress;
      const scaleX = 1 - Math.abs(angle / 165) * 0.02;
      return {
        transform: `perspective(1200px) rotateY(${angle}deg) scaleX(${scaleX})`,
        opacity: 1 - (pageProgress > 0.5 ? (pageProgress - 0.5) * 0.6 : 0),
        transition: "none",
      };
    }

    if (index === currentPageIndex + 1) {
      return { 
        transform: "perspective(1200px) rotateY(0deg)", 
        opacity: 1, 
        transition: "none" 
      };
    }

    return { display: "none" };
  };

  const progressDots = Array.from({ length: totalPages }).map(
    (_, i) => bookScrollProgress * (totalPages - 1) >= i
  );

  return {
    bookScrollProgress,
    currentPageIndex,
    pageProgress,
    progressDots,
    getPageStyle
  };
}
