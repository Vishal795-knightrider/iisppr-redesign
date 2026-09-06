// Background glowing orb component with Apple-style smooth ambient glow & floating physics
export function Orb({ x, y, r = 400, color, opacity = 0.35, blur = 70, anim = "animate-pulse-glow", style = {} }) {
  return (
    <div
      className={anim}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: r,
        height: r,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: "translate(-50%, -50%)",
        filter: `blur(${blur}px)`,
        opacity,
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform, opacity",
        ...style,
      }}
    />
  );
}
