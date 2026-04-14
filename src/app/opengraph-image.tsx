import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(145deg, #f4f6f2 0%, #f0e9d8 42%, #e4edd8 100%)",
          color: "#0c2c40",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "3px solid #0c2c40",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: "#0c2c40",
            }}
          >
            MKF
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>{site.shortName}</span>
            <span style={{ fontSize: 20, color: "#7fa646", fontWeight: 600 }}>{site.slogan}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <p style={{ fontSize: 28, lineHeight: 1.35, margin: 0, color: "#1a2d36" }}>
            Hope-centered prevention, education, and community support for families and schools.
          </p>
        </div>
        <p style={{ fontSize: 18, color: "#4a5c66", margin: 0 }}>{site.name}</p>
      </div>
    ),
    { ...size }
  );
}
