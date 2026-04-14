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
          background: "linear-gradient(160deg, #0c2c40 0%, #102f42 50%, #0c2c40 100%)",
          borderRadius: 36,
          border: "6px solid #7fa646",
        }}
      >
        <span
          style={{
            color: "#f4f6f2",
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
            color: "#7fa646",
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
