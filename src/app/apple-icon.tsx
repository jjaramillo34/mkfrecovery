import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0a1f3d 0%, #0f2d5c 50%, #0a1f3d 100%)",
          borderRadius: 36,
          border: "6px solid #3b82f6",
        }}
      >
        <span
          style={{
            color: "#f5f8ff",
            fontSize: 52,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.04em",
          }}
        >
          {site.shortName}
        </span>
        <span
          style={{
            marginTop: 8,
            color: "#60a5fa",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Foundation
        </span>
      </div>
    ),
    { ...size }
  );
}
