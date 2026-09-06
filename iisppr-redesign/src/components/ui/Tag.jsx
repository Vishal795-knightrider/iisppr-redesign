import { D } from "../../styles/theme";

// Reusable pill tag component inspired by GSSoC
export function Tag({ children, color = D.teal, bg = D.tealSo, border }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 14px", borderRadius: 99,
      background: bg, border: `1px solid ${border || "rgba(31, 182, 166, 0.22)"}`,
      fontSize: 11.5, fontWeight: 700, color,
      letterSpacing: "0.5px", textTransform: "uppercase",
      fontFamily: D.sans,
    }}>{children}</span>
  );
}
