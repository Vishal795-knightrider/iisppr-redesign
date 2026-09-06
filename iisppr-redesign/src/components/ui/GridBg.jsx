// Background grid pattern component inspired by GSSoC
export function GridBg({ opacity = 0.05 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(31, 182, 166, ${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(31, 182, 166, ${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: "64px 64px",
    }} />
  );
}
