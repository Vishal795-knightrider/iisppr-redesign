// Design tokens and animation variables

export const D = {
  // Backgrounds — warm dark, not cold
  bg:      "#09090b",
  bg1:     "#0e0e11",
  bg2:     "#121217",
  bg3:     "#17171e",
  bg4:     "#1c1c25",

  // Borders
  ln0:   "rgba(255,255,255,0.04)",
  ln1:   "rgba(255,255,255,0.08)",
  ln2:   "rgba(255,255,255,0.14)",
  ln3:   "rgba(255,255,255,0.22)",

  // Gold — primary accent
  gold:   "#c9973a",
  goldBr: "#e8b84b",
  goldSo: "rgba(201,151,58,0.12)",
  goldGl: "rgba(201,151,58,0.25)",
  goldRg: "rgba(201,151,58,0.08)",

  // Sage — secondary accent (academic, calm)
  sage:   "#5eaf8e",
  sageBr: "#7dcfac",
  sageSo: "rgba(94,175,142,0.10)",
  sageGl: "rgba(94,175,142,0.20)",

  // Lavender — tertiary (select highlights)
  lav:    "#9d8fdc",
  lavSo:  "rgba(157,143,220,0.10)",
  lavGl:  "rgba(157,143,220,0.20)",

  // Rose
  rose:   "#d97066",
  roseSo: "rgba(217,112,102,0.10)",

  // Ambient Glowing Orbs — Orange, Purple, Cyan
  orange:   "#f97316",
  orangeGl: "rgba(249,115,22,0.22)",
  orangeSo: "rgba(249,115,22,0.12)",

  purple:   "#a855f7",
  purpleGl: "rgba(168,85,247,0.20)",
  purpleSo: "rgba(168,85,247,0.10)",

  cyan:     "#06b6d4",
  cyanGl:   "rgba(6,182,212,0.22)",
  cyanSo:   "rgba(6,182,212,0.10)",

  // Frosted Glass tokens
  glassBg:  "rgba(255,255,255,0.05)",
  glassBgHover: "rgba(255,255,255,0.08)",
  glassBorder: "rgba(255,255,255,0.10)",
  glassBorderTop: "rgba(255,255,255,0.20)",

  // Text
  t0:  "#f5f4f0",   // near-white, warm
  t1:  "#c2bfb8",   // body
  t2:  "#7a7870",   // muted
  t3:  "#42403c",   // faint

  // Fonts
  serif: "'Fraunces', 'Georgia', serif",
  sans:  "'Cabinet Grotesk', 'DM Sans', sans-serif",
};

export const spring = { type: "spring", stiffness: 280, damping: 30 };
export const ease   = [0.22, 1, 0.36, 1];
export const easeIn = [0.4, 0, 0.2, 1];
