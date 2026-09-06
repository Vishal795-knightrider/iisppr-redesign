import { motion, useTransform } from 'framer-motion';
import React, { useState } from 'react';
import { Compass, FileText } from 'lucide-react';

/**
 * ========================================================
 * PAGE COMPONENT - DOUBLE-SIDED 3D SHEET RENDERER
 * ========================================================
 * This component represents one physical sheet of the book:
 * - A single sheet is double-sided: its Front is the Right Page of Spread i,
 *   and its Back is the Left Page of Spread i + 1.
 * - Sheet 0 is the Closed Front Cover.
 * - Sheet 5 (the last sheet) has its Back Face styled as the Closed Back Cover.
 * - It pivot-rotates about the left edge (center spine) in 3D.
 */
// Subcomponent for Desktop 2-page spread rendering
const DesktopPage = ({ index, totalSheets, smoothProgress, bookContent }) => {
  // Local state to monitor corner lifting hover actions
  const [isHovered, setIsHovered] = useState(false);

  // --------------------------------------------------------
  // 1. SCROLL-DRIVEN 3D TRANSFORMS
  // --------------------------------------------------------
  // Define strict, sequential scroll intervals for each sheet
  const step = 1 / totalSheets;
  const start = index * step;
  const end = (index + 1) * step;
  const mid = start + step / 2;

  // Strict, mathematical angle mapping to ensure only the active page rotates.
  // Inactive pages are perfectly locked at 0deg (unflipped) or -180deg (flipped)
  // to prevent spring overshoot oscillations or stack wiggles.
  const rotateY = useTransform(smoothProgress, (val) => {
    if (val <= start) return 0;
    if (val >= end) return -180;
    const ratio = (val - start) / (end - start);
    return -180 * ratio;
  });

  // Calculate dynamic z-index to prevent 3D clipping in the browser.
  // Flipping pages float on top, unflipped stack on right, flipped stack on left.
  const zIndex = useTransform(smoothProgress, (val) => {
    if (val > start && val < end) {
      return 100; // Floating active turning page
    }
    return val < mid ? totalSheets - index : index;
  });

  // --------------------------------------------------------
  // 2. KINETIC FLEXING & SPECULAR SHINE EFFECTS
  // --------------------------------------------------------
  // Page skews slightly during the turn to simulate flexible paper bending
  const skewY = useTransform(rotateY, 
    [0, -45, -90, -135, -180], 
    [0, -4.5, 0, 4.5, 0]
  );

  // Subtle Z-displacement pushes active flipping page slightly closer to camera
  const translateZ = useTransform(rotateY,
    [0, -90, -180],
    [0, 30, 0]
  );

  // Specular light sweep sheens flaring across the page surface at 90 degrees
  const lightSweepFront = useTransform(rotateY,
    [0, -65, -90, -115, -180],
    [0, 0.45, 0.1, 0, 0]
  );

  const lightSweepBack = useTransform(rotateY,
    [0, -65, -90, -115, -180],
    [0, 0, 0.1, 0.45, 0]
  );

  // --------------------------------------------------------
  // 3. UNDER-PAGE SHADOW PROJECTIONS
  // --------------------------------------------------------
  // Casts a dark shadow on the left stack when the page settles to the left
  const leftShadowOpacity = useTransform(rotateY,
    [-90, -135, -180],
    [0.7, 0.35, 0]
  );
  const leftShadowScale = useTransform(rotateY,
    [-90, -135, -180],
    [0.85, 0.95, 1.0]
  );

  // Casts a dark shadow on the right stack when the page lifts to the left
  const rightShadowOpacity = useTransform(rotateY,
    [0, -45, -90],
    [0, 0.35, 0.7]
  );
  const rightShadowScale = useTransform(rotateY,
    [0, -45, -90],
    [1.0, 0.95, 0.85]
  );

  // --------------------------------------------------------
  // 4. CONTENT PARALLAX OVERLAYS
  // --------------------------------------------------------
  // Horizontal drift inside left page photo frame to create parallax depth
  const parallaxX = useTransform(rotateY,
    [0, -180],
    [30, -30]
  );

  // Identify cover layers
  const isCover = index === 0;
  const isBackCover = index === totalSheets - 1;

  // Map spread content to the left and right pages symmetrically
  // Sheet i Back Face displays bookContent[i] (Left Page of Spread i + 1)
  const leftContent = !isBackCover ? bookContent[index] : null;
  // Sheet i Front Face displays bookContent[i - 1] (Right Page of Spread i)
  const rightContent = !isCover ? bookContent[index - 1] : null;

  return (
    <>
      {/* 3D Under-Shadow Layer (Cast on Right Stack) */}
      <motion.div
        style={{
          opacity: rightShadowOpacity,
          scale: rightShadowScale,
          transformOrigin: 'left center',
          rotateY: 0,
          zIndex: zIndex
        }}
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none bg-gradient-to-r from-black/80 via-black/40 to-transparent blur-md z-0"
      />

      {/* 3D Under-Shadow Layer (Cast on Left Stack) */}
      <motion.div
        style={{
          opacity: leftShadowOpacity,
          scale: leftShadowScale,
          transformOrigin: 'right center',
          rotateY: 0,
          zIndex: zIndex
        }}
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none bg-gradient-to-l from-black/80 via-black/40 to-transparent blur-md z-0"
      />

      {/* ======================================================== */}
      {/* MAIN FLIPPING SHEET CONTAINER */}
      {/* ======================================================== */}
      <motion.div
        style={{
          rotateY,
          skewY,
          translateZ,
          zIndex,
          transformOrigin: 'left center',
        }}
        className="absolute top-0 right-0 w-1/2 h-full preserve-3d transition-shadow duration-300 pointer-events-auto"
      >
        
        {/* ======================================================== */}
        {/* FRONT OF THE SHEET (Visible on the Right side of spread) */}
        {/* ======================================================== */}
        <motion.div 
          style={{ transformOrigin: 'left center' }}
          animate={isHovered ? {
            rotateY: -3.5,
            translateZ: 12,
            boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.65), inset 0 0 15px rgba(0,0,0,0.15)"
          } : {
            rotateY: 0,
            translateZ: 0,
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => {
            const currentProgress = smoothProgress.get();
            const activeIndex = Math.min(totalSheets - 1, Math.floor(currentProgress * totalSheets));
            // Hover only if this page is the current active top page and is still flat on the right
            if (index === activeIndex && currentProgress <= start) {
              setIsHovered(true);
            }
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute inset-0 backface-hidden bg-[#0e1320] rounded-r-2xl border-y border-r border-slate-800/40 shadow-page-3d overflow-hidden flex flex-col z-10 preserve-3d cursor-pointer"
        >
          
          {/* Static creases in the center spine seam */}
          <div className="absolute inset-y-0 left-0 w-16 page-crease-right pointer-events-none z-30" />
          <div className="absolute inset-y-0 left-0 w-4 spine-groove-right pointer-events-none z-30" />

          {/* Dynamic Light Sweep reflection overlay */}
          <motion.div 
            style={{ opacity: lightSweepFront }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-40" 
          />

          {isCover ? (
            /* FRONT COVER CLOSED DESIGN */
            <div className="relative w-full h-full bg-gradient-to-br from-[#0c0f18] via-[#090b11] to-[#040608] flex flex-col justify-between p-12 paper-texture border-l border-slate-900/60">
              
              {/* Embossed gold double borders */}
              <div className="absolute inset-6 border border-[var(--color-gold)]/20 rounded-lg pointer-events-none" />
              <div className="absolute inset-7 border border-[var(--color-gold)]/10 rounded-lg pointer-events-none" />

              <div className="flex justify-between items-start z-10 mt-4">
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/60 font-bold">
                  Annual Report
                </span>
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/60 font-bold">
                  IISPPR • MXXVI
                </span>
              </div>

              {/* Center Embossed Seal */}
              <div className="flex flex-col items-center text-center z-10 my-auto">
                <div className="w-16 h-16 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center mb-8 bg-[#090c12] shadow-inner">
                  <Compass className="w-8 h-8 text-[var(--color-gold)] stroke-[1]" />
                </div>
                
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide leading-[1.08] mb-4">
                  The SDG <br />
                  <span className="italic text-[var(--color-gold)] font-normal">Chronicles</span>
                </h1>
                
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent my-4" />
                
                <p className="font-display text-[9px] text-slate-400 font-light max-w-xs leading-relaxed uppercase tracking-[0.25em]">
                  Sustainable Policy & Governance Review
                </p>
              </div>

              {/* Cover Footer & Action Hint */}
              <div className="flex flex-col items-center gap-4 z-10 mb-4">
                <span className="font-display text-[8px] uppercase tracking-[0.25em] text-slate-500">
                  Scroll down to open
                </span>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-[var(--color-gold)]/20 to-transparent pointer-events-none rounded-br-2xl page-corner-lift" />
              </div>
            </div>
          ) : (
            /* STANDARD RIGHT PAGE: PREMIUM DARK ACADEMIC RESEARCH JOURNAL PAGE */
            <div className="relative w-full h-full bg-[#0d121f] text-slate-100 flex flex-col justify-between p-8 sm:p-12 paper-texture border-l border-slate-800/30">
              
              {/* Gold foiled border accent around the magazine page */}
              <div className="absolute inset-5 border border-[var(--color-gold)]/10 rounded pointer-events-none z-0" />
              
              {/* Elegant header */}
              <div className="flex justify-between items-center z-10 border-b border-slate-800 pb-3">
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]/70 font-bold">
                  {rightContent.chapter}
                </span>
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  IISPPR Research Review
                </span>
              </div>

              {/* Research journal layout */}
              <div className="flex flex-col justify-center flex-grow z-10 my-auto py-6 pl-2">
                
                {/* Custom Lucide Icon */}
                <div className="mb-4">
                  {rightContent.icon}
                </div>

                {/* Tagline */}
                <span className="font-display text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-2">
                  {rightContent.subtitle}
                </span>

                {/* Article Serif Header */}
                <h2 className="font-editorial text-3xl sm:text-4xl font-light leading-[1.08] text-white tracking-wide mb-6">
                  {rightContent.title}
                </h2>

                <div className="w-16 h-[1px] bg-[var(--color-gold)]/40 mb-6" />

                {/* Editorial text with drop cap */}
                <p className="font-display text-[12.5px] sm:text-[14px] leading-relaxed text-slate-300 font-light antialiased max-w-lg">
                  <span className="font-editorial text-5xl float-left mr-2 mt-1 leading-[0.8] font-bold text-[var(--color-gold)] select-none">
                    {rightContent.content.charAt(0)}
                  </span>
                  {rightContent.content.substring(1)}
                </p>

                {/* Academic Quote overlay */}
                {rightContent.quote && (
                  <div className="mt-8 border-l border-[var(--color-gold)]/30 pl-4 py-1 italic font-editorial text-sm text-[var(--color-gold)]/60 max-w-md">
                    "{rightContent.quote}"
                  </div>
                )}

              </div>

              {/* Page Number footer */}
              <div className="flex justify-end items-center z-10 border-t border-slate-800 pt-3">
                <span className="font-editorial text-sm font-semibold text-[var(--color-gold)]/60 font-mono italic">
                  {(index * 2) + 1}
                </span>
              </div>

              {/* Interactive Corner Lift Indicator */}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[var(--color-gold)]/5 rounded-br-2xl pointer-events-none" />
            </div>
          )}
        </motion.div>

        {/* ======================================================= */}
        {/* BACK OF THE SHEET (Visible on the Left side when flipped) */}
        {/* ======================================================= */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#0d121f] rounded-l-2xl border-y border-l border-slate-800/40 shadow-page-3d overflow-hidden flex flex-col z-10 preserve-3d"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* Static creases in the center spine seam */}
          <div className="absolute inset-y-0 right-0 w-16 page-crease-left pointer-events-none z-30" />
          <div className="absolute inset-y-0 right-0 w-4 spine-groove-left pointer-events-none z-30" />

          {/* Dynamic Light Sweep reflection overlay */}
          <motion.div 
            style={{ opacity: lightSweepBack }}
            className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent pointer-events-none z-40" 
          />

          {isBackCover ? (
            /* BACK COVER CLOSED DESIGN */
            <div className="relative w-full h-full bg-gradient-to-bl from-[#0c0f18] via-[#090b11] to-[#040608] flex flex-col justify-between p-12 paper-texture border-r border-slate-900/60">
              
              {/* Embossed gold border */}
              <div className="absolute inset-6 border border-[var(--color-gold)]/20 rounded-lg pointer-events-none" />

              <div className="flex justify-between items-start z-10 mt-4">
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/40">
                  IISPPR Publications
                </span>
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/40">
                  MXXVI
                </span>
              </div>

              {/* Embossed Gold Stamp */}
              <div className="flex flex-col items-center text-center z-10 my-auto">
                <div className="w-12 h-12 rounded-full border border-[var(--color-gold)]/25 flex items-center justify-center mb-6 bg-[#090c12]/40">
                  <Compass className="w-5 h-5 text-[var(--color-gold)]/50 stroke-[1]" />
                </div>
                <h3 className="font-editorial text-2xl font-light text-slate-350 tracking-wider mb-2">
                  THE END
                </h3>
                <div className="w-12 h-[1px] bg-[var(--color-gold)]/30 my-3" />
                <p className="font-display text-[9px] uppercase tracking-[0.2em] text-slate-500 max-w-[200px] leading-relaxed">
                  Advancing sustainable policy through academic consensus
                </p>
              </div>

              <div className="flex justify-center z-10 mb-4">
                <span className="font-display text-[8px] uppercase tracking-[0.2em] text-slate-600">
                  All rights reserved
                </span>
              </div>
            </div>
          ) : (
            /* STANDARD LEFT PAGE: CINEMATIC IMAGES LAYER WITH DUAL LABELS & PARALLAX */
            <div className="relative w-full h-full bg-slate-950 overflow-hidden flex flex-col justify-between">
              
              {/* Immersive photo with horizontal parallax translation */}
              <motion.div 
                style={{ x: parallaxX }}
                className="absolute inset-0 w-[120%] h-full left-[-10%]"
              >
                <img 
                  src={leftContent.image} 
                  alt={leftContent.title} 
                  className="w-full h-full object-cover select-none filter brightness-[0.5] contrast-[1.08] saturate-[0.8]"
                />
                {/* Ambient dark vignette styling */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-[#080b11]/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080b11]/60 via-transparent to-transparent z-10" />
              </motion.div>

              {/* Dynamic Infographics and Policy Diagrams Overlay */}
              {leftContent.id === 1 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-36 h-36 rounded-full border border-[var(--color-gold)]/20 flex items-center justify-center" style={{ animation: 'spin 25s linear infinite' }}>
                    <div className="w-28 h-28 rounded-full border border-dashed border-[var(--color-gold)]/30 flex items-center justify-center">
                      <Compass className="w-10 h-10 text-[var(--color-gold)]/40 stroke-[0.8]" />
                    </div>
                  </div>
                </div>
              )}

              {leftContent.id === 2 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-800/80" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-[var(--color-gold)] border-r-[var(--color-gold)] border-b-[var(--color-gold)]/30 animate-pulse shadow-[0_0_20px_rgba(223,194,125,0.15)]" />
                    <div className="text-center">
                      <span className="font-display text-4xl font-extrabold tracking-tight text-white block">17</span>
                      <span className="font-display text-[8px] uppercase tracking-widest text-[var(--color-gold)] font-bold">UN Goals</span>
                    </div>
                  </div>
                  <div className="glass-panel py-1 px-3 rounded-full border-white/10 mt-3 text-[9px] font-display text-slate-350 tracking-wider">
                    SDG Index: <span className="text-[var(--color-gold)] font-bold">96.8%</span>
                  </div>
                </div>
              )}

              {leftContent.id === 3 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-6">
                  <div className="glass-panel p-4 rounded-xl border-white/10 max-w-[200px] w-full bg-[#0a0f1d]/75 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-gold)]/5 rounded-bl-full pointer-events-none" />
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <FileText className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      <span className="font-display text-[8px] uppercase tracking-widest text-slate-400 font-bold">JOURNAL INDEX</span>
                    </div>
                    <div className="h-1.5 w-12 bg-[var(--color-gold)]/60 rounded mb-2" />
                    <div className="h-1 w-24 bg-slate-700/60 rounded mb-1" />
                    <div className="h-1 w-20 bg-slate-700/60 rounded mb-1" />
                    <div className="h-1 w-16 bg-slate-700/60 rounded mb-3" />
                    <div className="flex justify-between items-center border-t border-slate-800/80 pt-2 mt-2 text-[8px] font-display text-slate-500">
                      <span>ISSN: 2471-9312</span>
                      <span className="text-[var(--color-gold)] font-semibold">APPROVED</span>
                    </div>
                  </div>
                </div>
              )}

              {leftContent.id === 4 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="relative w-44 h-32 flex items-center justify-center">
                    <div className="absolute top-0 left-6 w-8 h-8 rounded-full bg-[#0d121f]/80 border border-[var(--color-gold)]/40 flex items-center justify-center text-[9px] text-[var(--color-gold)] font-bold shadow-md">GOV</div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-[#0d121f]/80 border border-slate-700 flex items-center justify-center text-[9px] text-slate-400 font-bold shadow-md">ORG</div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#0d121f]/80 border border-slate-700 flex items-center justify-center text-[9px] text-slate-400 font-bold shadow-md">COM</div>
                    <div className="w-12 h-12 rounded-full bg-[var(--color-gold)] text-[#0d121f] flex items-center justify-center text-xs font-bold shadow-lg shadow-[var(--color-gold)]/20 z-10">POLICY</div>
                    
                    <svg className="absolute inset-0 w-full h-full opacity-40 animate-pulse" stroke="rgba(223,194,125,0.4)" strokeWidth="1">
                      <line x1="88" y1="64" x2="48" y2="28" />
                      <line x1="88" y1="64" x2="40" y2="108" />
                      <line x1="88" y1="64" x2="136" y2="108" />
                    </svg>
                  </div>
                </div>
              )}

              {leftContent.id === 5 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-6">
                  <div className="flex flex-col gap-2 w-full max-w-[180px]">
                    <div className="glass-panel p-2 rounded-lg border-white/5 bg-[#0a0f1d]/60 flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-[var(--color-gold)]/20 flex items-center justify-center text-[9px] font-bold text-[var(--color-gold)]">01</div>
                      <span className="font-display text-[8px] uppercase tracking-widest text-slate-350 font-semibold">Leadership Core</span>
                    </div>
                    <div className="glass-panel p-2 rounded-lg border-white/5 bg-[#0a0f1d]/60 flex items-center gap-3 ml-3">
                      <div className="w-4 h-4 rounded bg-[var(--color-gold)]/20 flex items-center justify-center text-[9px] font-bold text-[var(--color-gold)]">02</div>
                      <span className="font-display text-[8px] uppercase tracking-widest text-slate-350 font-semibold">Mentorship Node</span>
                    </div>
                    <div className="glass-panel p-2 rounded-lg border-white/5 bg-[#0a0f1d]/60 flex items-center gap-3 ml-6">
                      <div className="w-4 h-4 rounded bg-[var(--color-gold)]/20 flex items-center justify-center text-[9px] font-bold text-[var(--color-gold)]">03</div>
                      <span className="font-display text-[8px] uppercase tracking-widest text-slate-350 font-semibold">Field Exposure</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay HUD metrics and labels */}
              <div className="relative z-20 p-8 sm:p-12 flex flex-col justify-between h-full">
                
                {/* Thin gold foiled top line */}
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {leftContent.chapter}
                  </span>
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Empirical Canvas
                  </span>
                </div>

                {/* Chapter visual stamp */}
                <div className="my-auto py-8">
                  <div className="font-editorial text-[7rem] sm:text-[10rem] font-bold text-white/5 select-none leading-none tracking-tighter mb-2">
                    {leftContent.id.toString().padStart(2, '0')}
                  </div>
                  
                  {/* Floating Glassmorphic Caption Card */}
                  <div className="glass-panel p-4 rounded-xl border-white/10 max-w-xs mt-[-2rem] ml-4 bg-[#0a0f1d]/50">
                    <span className="font-display text-[9px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-bold mb-1 block">
                      {leftContent.id === 1 && "ABOUT IISPPR"}
                      {leftContent.id === 2 && "UN ACCREDITATION"}
                      {leftContent.id === 3 && "SCHOLARLY REVIEW"}
                      {leftContent.id === 4 && "POLICY SYSTEM"}
                      {leftContent.id === 5 && "LEARNING PATH"}
                    </span>
                    <p className="font-display text-[11px] leading-relaxed text-slate-300 font-light">
                      {leftContent.id === 1 && "Rigorous research, education, policy studies, and community engagement blueprints."}
                      {leftContent.id === 2 && "Quality education, poverty eradication, environmental preservation, and social parity metrics."}
                      {leftContent.id === 3 && "Scholarly journals, interdisciplinary research papers, and evidentiary guidelines."}
                      {leftContent.id === 4 && "Innovation-driven diagrams, public policy nodes, and governance frameworks."}
                      {leftContent.id === 5 && "Mentorship networks, student internships, and career training pathways."}
                    </p>
                  </div>
                </div>

                {/* Footer labels */}
                <div className="flex justify-between items-center border-t border-white/10 pt-3">
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Global Perspective
                  </span>
                  <span className="font-editorial text-sm font-semibold text-white/40 font-mono italic">
                    {(index * 2) + 2}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

/**
 * ========================================================
 * MOBILE PAGE COMPONENT - PORTRAIT SINGLE-SHEET 3D FLIPPER
 * ========================================================
 * Optimized specifically for mobile viewports (< 768px):
 * - Portrait layout filling mobile width & height comfortably (~90vw x ~68vh)
 * - Large, crisp, legible typography (12-14px text, drop caps, quotes)
 * - Integrated visual stage showcasing chapter photo & animated diagrams
 * - Authentic 3D page-curl and flip animation pivoting around left spine
 */
const MobilePage = ({ index, totalSheets, smoothProgress, bookContent }) => {
  const step = 1 / totalSheets;
  const start = index * step;
  const end = (index + 1) * step;

  // Mobile 3D page flip rotation
  const rotateY = useTransform(smoothProgress, (val) => {
    if (val <= start) return 0;
    if (val >= end) return -120;
    const ratio = (val - start) / (end - start);
    return -120 * ratio;
  });

  const skewY = useTransform(rotateY,
    [0, -40, -80, -120],
    [0, -3.5, 0, 2]
  );

  const translateZ = useTransform(rotateY,
    [0, -60, -120],
    [0, 35, 0]
  );

  const opacity = useTransform(smoothProgress, (val) => {
    if (val <= start) return 1;
    if (val >= end) return 0;
    const ratio = (val - start) / (end - start);
    if (ratio < 0.65) return 1;
    return 1 - ((ratio - 0.65) / 0.35);
  });

  const zIndex = useTransform(smoothProgress, (val) => {
    if (val > start && val < end) return 60;
    if (val <= start) return totalSheets - index + 10;
    return 0;
  });

  const pointerEvents = useTransform(smoothProgress, (val) => (val >= end ? 'none' : 'auto'));

  const underShadowOpacity = useTransform(smoothProgress, (val) => {
    if (val <= start || val >= end) return 0;
    const ratio = (val - start) / (end - start);
    return Math.sin(ratio * Math.PI) * 0.45;
  });

  const isCover = index === 0;
  const content = !isCover && index <= bookContent.length ? bookContent[index - 1] : null;

  return (
    <>
      {/* Under-page shadow for mobile */}
      <motion.div
        style={{
          opacity: underShadowOpacity,
          zIndex: 5,
        }}
        className="absolute inset-0 rounded-2xl bg-black/70 blur-md pointer-events-none"
      />

      {/* Main Flipping Sheet Container */}
      <motion.div
        style={{
          rotateY,
          skewY,
          translateZ,
          opacity,
          zIndex,
          pointerEvents,
          transformOrigin: 'left center',
        }}
        className="absolute inset-0 w-full h-full preserve-3d transition-shadow duration-300"
      >
        {/* FRONT OF THE SHEET */}
        <div className="absolute inset-0 backface-hidden bg-[#0d121f] rounded-2xl border border-slate-800/60 shadow-page-3d overflow-hidden flex flex-col z-10 preserve-3d">
          {/* Static creases in the left spine seam */}
          <div className="absolute inset-y-0 left-0 w-8 page-crease-right pointer-events-none z-30 opacity-70" />
          <div className="absolute inset-y-0 left-0 w-2 spine-groove-right pointer-events-none z-30 opacity-70" />

          {isCover ? (
            /* MOBILE FRONT COVER CLOSED DESIGN */
            <div className="relative w-full h-full bg-gradient-to-br from-[#0c0f18] via-[#090b11] to-[#040608] flex flex-col justify-between p-6 xs:p-8 paper-texture border-l border-slate-900/60">
              {/* Embossed gold double borders */}
              <div className="absolute inset-3 border border-[var(--color-gold)]/20 rounded-xl pointer-events-none" />
              <div className="absolute inset-4 border border-[var(--color-gold)]/10 rounded-lg pointer-events-none" />

              <div className="flex justify-between items-start z-10 mt-1">
                <span className="font-display text-[8.5px] uppercase tracking-[0.25em] text-[var(--color-gold)]/70 font-bold">
                  Annual Report
                </span>
                <span className="font-display text-[8.5px] uppercase tracking-[0.25em] text-[var(--color-gold)]/70 font-bold">
                  IISPPR • MXXVI
                </span>
              </div>

              {/* Center Embossed Seal */}
              <div className="flex flex-col items-center text-center z-10 my-auto">
                <div className="w-14 h-14 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center mb-5 bg-[#090c12] shadow-inner">
                  <Compass className="w-7 h-7 text-[var(--color-gold)] stroke-[1]" />
                </div>
                
                <h1 className="font-editorial text-3xl xs:text-4xl font-light text-white tracking-wide leading-[1.1] mb-3">
                  The SDG <br />
                  <span className="italic text-[var(--color-gold)] font-normal">Chronicles</span>
                </h1>
                
                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent my-3" />
                
                <p className="font-display text-[8.5px] text-slate-400 font-light max-w-[200px] leading-relaxed uppercase tracking-[0.2em]">
                  Sustainable Policy & Governance Review
                </p>
              </div>

              {/* Cover Footer & Action Hint */}
              <div className="flex flex-col items-center gap-1.5 z-10 mb-1">
                <span className="font-display text-[8px] uppercase tracking-[0.25em] text-slate-500 animate-pulse">
                  Scroll down to open
                </span>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-[var(--color-gold)]/20 to-transparent pointer-events-none rounded-br-2xl" />
              </div>
            </div>
          ) : content ? (
            /* MOBILE CHAPTER PAGE: RICH INTEGRATED VISUAL + EDITORIAL DESIGN */
            <div className="relative w-full h-full bg-[#0d121f] text-slate-100 flex flex-col justify-between py-3.5 pl-6 pr-3.5 xs:py-4 xs:pl-7 xs:pr-4 paper-texture border-l border-slate-800/40">
              {/* Inner gold foiled border accent */}
              <div className="absolute top-2.5 bottom-2.5 right-2.5 left-4 xs:left-5 border border-[var(--color-gold)]/10 rounded-xl pointer-events-none z-0" />

              {/* Header */}
              <div className="flex justify-between items-center z-10 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] text-[var(--color-gold)]/80 font-bold">
                    {content.chapter}
                  </span>
                </div>
                <span className="font-display text-[8.5px] uppercase tracking-[0.15em] text-slate-400">
                  0{index} / 0{totalSheets - 1}
                </span>
              </div>

              {/* Visual Showcase Stage */}
              <div className="relative w-full h-[140px] xs:h-[155px] rounded-lg overflow-hidden border border-slate-800/80 my-2 z-10 bg-slate-950 shadow-inner flex-shrink-0">
                <img 
                  src={content.image} 
                  alt={content.title} 
                  className="w-full h-full object-cover select-none filter brightness-[0.45] contrast-[1.1] saturate-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-transparent to-transparent z-10" />

                {/* Animated Diagram Overlays for Each Chapter */}
                {content.id === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-24 h-24 rounded-full border border-[var(--color-gold)]/25 flex items-center justify-center" style={{ animation: 'spin 25s linear infinite' }}>
                      <div className="w-18 h-18 rounded-full border border-dashed border-[var(--color-gold)]/35 flex items-center justify-center">
                        <Compass className="w-7 h-7 text-[var(--color-gold)]/60 stroke-[0.9]" />
                      </div>
                    </div>
                  </div>
                )}

                {content.id === 2 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-slate-800/80" />
                      <div className="absolute inset-0 rounded-full border-2 border-t-[var(--color-gold)] border-r-[var(--color-gold)] border-b-[var(--color-gold)]/30 animate-pulse shadow-[0_0_15px_rgba(223,194,125,0.2)]" />
                      <div className="text-center">
                        <span className="font-display text-2xl font-extrabold tracking-tight text-white block leading-none">17</span>
                        <span className="font-display text-[7px] uppercase tracking-widest text-[var(--color-gold)] font-bold">UN Goals</span>
                      </div>
                    </div>
                    <div className="glass-panel py-0.5 px-2.5 rounded-full border-white/10 mt-2 text-[8px] font-display text-slate-300 tracking-wider">
                      SDG Index: <span className="text-[var(--color-gold)] font-bold">96.8%</span>
                    </div>
                  </div>
                )}

                {content.id === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-3">
                    <div className="glass-panel p-2.5 rounded-lg border-white/10 max-w-[160px] w-full bg-[#0a0f1d]/85 shadow-lg relative overflow-hidden">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <FileText className="w-3 h-3 text-[var(--color-gold)]" />
                        <span className="font-display text-[7.5px] uppercase tracking-widest text-slate-300 font-bold">JOURNAL INDEX</span>
                      </div>
                      <div className="h-1 w-10 bg-[var(--color-gold)]/70 rounded mb-1.5" />
                      <div className="h-1 w-20 bg-slate-700/60 rounded mb-1" />
                      <div className="h-1 w-14 bg-slate-700/60 rounded mb-2" />
                      <div className="flex justify-between items-center border-t border-slate-800/80 pt-1.5 text-[7px] font-display text-slate-400">
                        <span>ISSN: 2471-9312</span>
                        <span className="text-[var(--color-gold)] font-semibold">APPROVED</span>
                      </div>
                    </div>
                  </div>
                )}

                {content.id === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="relative w-36 h-24 flex items-center justify-center scale-90">
                      <div className="absolute top-0 left-4 w-6 h-6 rounded-full bg-[#0d121f]/90 border border-[var(--color-gold)]/50 flex items-center justify-center text-[7.5px] text-[var(--color-gold)] font-bold shadow-md">GOV</div>
                      <div className="absolute bottom-1 left-2 w-6 h-6 rounded-full bg-[#0d121f]/90 border border-slate-700 flex items-center justify-center text-[7.5px] text-slate-400 font-bold shadow-md">ORG</div>
                      <div className="absolute bottom-1 right-2 w-6 h-6 rounded-full bg-[#0d121f]/90 border border-slate-700 flex items-center justify-center text-[7.5px] text-slate-400 font-bold shadow-md">COM</div>
                      <div className="w-9 h-9 rounded-full bg-[var(--color-gold)] text-[#0d121f] flex items-center justify-center text-[9px] font-bold shadow-lg shadow-[var(--color-gold)]/25 z-10">POLICY</div>
                      
                      <svg className="absolute inset-0 w-full h-full opacity-40 animate-pulse" stroke="rgba(223,194,125,0.4)" strokeWidth="1">
                        <line x1="72" y1="48" x2="32" y2="18" />
                        <line x1="72" y1="48" x2="28" y2="80" />
                        <line x1="72" y1="48" x2="116" y2="80" />
                      </svg>
                    </div>
                  </div>
                )}

                {content.id === 5 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-3">
                    <div className="flex flex-col gap-1.5 w-full max-w-[150px]">
                      <div className="glass-panel py-1 px-2 rounded border-white/5 bg-[#0a0f1d]/75 flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded bg-[var(--color-gold)]/20 flex items-center justify-center text-[7.5px] font-bold text-[var(--color-gold)]">01</div>
                        <span className="font-display text-[7.5px] uppercase tracking-widest text-slate-200 font-semibold">Leadership Core</span>
                      </div>
                      <div className="glass-panel py-1 px-2 rounded border-white/5 bg-[#0a0f1d]/75 flex items-center gap-2 ml-2.5">
                        <div className="w-3.5 h-3.5 rounded bg-[var(--color-gold)]/20 flex items-center justify-center text-[7.5px] font-bold text-[var(--color-gold)]">02</div>
                        <span className="font-display text-[7.5px] uppercase tracking-widest text-slate-200 font-semibold">Mentorship Node</span>
                      </div>
                      <div className="glass-panel py-1 px-2 rounded border-white/5 bg-[#0a0f1d]/75 flex items-center gap-2 ml-5">
                        <div className="w-3.5 h-3.5 rounded bg-[var(--color-gold)]/20 flex items-center justify-center text-[7.5px] font-bold text-[var(--color-gold)]">03</div>
                        <span className="font-display text-[7.5px] uppercase tracking-widest text-slate-200 font-semibold">Advisory Board</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Editorial Section */}
              <div className="flex flex-col justify-center flex-grow z-10 py-1">
                <span className="font-display text-[8.5px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-1">
                  {content.subtitle}
                </span>

                <h2 className="font-editorial text-xl xs:text-2xl font-light leading-tight text-white tracking-wide mb-1.5">
                  {content.title}
                </h2>

                <div className="w-10 h-[1px] bg-[var(--color-gold)]/40 mb-1.5" />

                <p className="font-display text-[11.5px] xs:text-[12.5px] leading-relaxed text-slate-300 font-light antialiased">
                  <span className="font-editorial text-2xl xs:text-3xl float-left mr-1.5 mt-0.5 leading-none font-bold text-[var(--color-gold)] select-none">
                    {content.content.charAt(0)}
                  </span>
                  {content.content.substring(1)}
                </p>

                {content.quote && (
                  <div className="mt-2 border-l border-[var(--color-gold)]/40 pl-2.5 py-0.5 italic font-editorial text-[10.5px] xs:text-[11.5px] text-[var(--color-gold)]/80 line-clamp-2">
                    "{content.quote}"
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center z-10 border-t border-slate-800/80 pt-2">
                <span className="font-display text-[8px] uppercase tracking-[0.2em] text-slate-500">
                  IISPPR Research Review
                </span>
                <span className="font-editorial text-xs font-semibold text-[var(--color-gold)]/60 font-mono italic">
                  {(index * 2) - 1}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {/* BACK OF THE SHEET (Visible when turning past 90 degrees) */}
        <div 
          className="absolute inset-0 backface-hidden bg-gradient-to-l from-[#090d16] to-[#0c111e] rounded-2xl border border-slate-800/50 shadow-page-3d overflow-hidden flex flex-col z-10 preserve-3d paper-texture"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-3 border border-[var(--color-gold)]/10 rounded-xl pointer-events-none" />
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center opacity-40">
            <Compass className="w-8 h-8 text-[var(--color-gold)] mb-3 stroke-[1]" />
            <span className="font-display text-[8px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-bold">
              IISPPR Digital Research
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Unified Page component delegator
export const Page = (props) => {
  if (props.isMobile) {
    return <MobilePage {...props} />;
  }
  return <DesktopPage {...props} />;
};

