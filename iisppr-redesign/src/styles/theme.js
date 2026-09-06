// Design tokens and animation variables inspired by GSSoC & Apple Glassmorphism

export const D = {
  // GSSoC Clean Backgrounds
  bg:      "#ffffff",
  bg1:     "#f8fafc",
  bg2:     "#ffffff",
  bg3:     "#f1f5f9",
  bg4:     "#e2e8f0",
  indigo:  "#0B1026",

  // Borders
  ln0:   "rgba(11,16,38,0.04)",
  ln1:   "rgba(11,16,38,0.08)",
  ln2:   "rgba(11,16,38,0.14)",
  ln3:   "rgba(11,16,38,0.22)",

  // GSSoC Primary Accent — Vibrant Teal & Mint
  teal:    "#1FB6A6",
  tealDark:"#168F82",
  tealBr:  "#2EC4B6",
  tealMint:"#5EEAD4",
  tealSo:  "rgba(31,182,166,0.10)",
  tealGl:  "rgba(31,182,166,0.22)",
  tealRg:  "rgba(31,182,166,0.06)",

  // Gold — for prestigious awards & featured pill
  gold:   "#d97706",
  goldBr: "#f59e0b",
  goldSo: "rgba(245,158,11,0.12)",
  goldGl: "rgba(245,158,11,0.22)",
  goldRg: "rgba(245,158,11,0.06)",

  // Sage / Emerald
  sage:   "#10b981",
  sageBr: "#34d399",
  sageSo: "rgba(16,185,129,0.10)",
  sageGl: "rgba(16,185,129,0.20)",

  // Lavender / Violet
  lav:    "#6366f1",
  lavSo:  "rgba(99,102,241,0.10)",
  lavGl:  "rgba(99,102,241,0.20)",

  // Rose / Coral
  rose:   "#f43f5e",
  roseSo: "rgba(244,63,94,0.10)",

  // Ambient Glows
  orange:   "#ea580c",
  orangeGl: "rgba(234,88,12,0.18)",
  orangeSo: "rgba(234,88,12,0.08)",

  purple:   "#7c3aed",
  purpleGl: "rgba(124,58,237,0.16)",
  purpleSo: "rgba(124,58,237,0.08)",

  cyan:     "#06b6d4",
  cyanGl:   "rgba(6,182,212,0.18)",
  cyanSo:   "rgba(6,182,212,0.08)",

  // Apple Light Frosted Glass tokens
  glassBg:      "rgba(255,255,255,0.80)",
  glassBgHover: "rgba(255,255,255,0.92)",
  glassBorder:  "rgba(255,255,255,0.95)",
  glassBorderSubtle: "rgba(11,16,38,0.08)",

  // Text colors (GSSoC High Contrast Palette)
  t0:  "#0B1026",   // Deep midnight indigo — main headings
  t1:  "#2e3757",   // Dark slate — readable body text
  t2:  "#6e7a99",   // Medium slate — secondary / labels
  t3:  "#9aa3bf",   // Faint slate — metadata / subtitles

  // Fonts
  serif: "'Fraunces', 'Georgia', serif",
  sans:  "'Cabinet Grotesk', 'DM Sans', sans-serif",
};

export const spring = { type: "spring", stiffness: 280, damping: 30 };
export const ease   = [0.22, 1, 0.36, 1];
export const easeIn = [0.4, 0, 0.2, 1];
