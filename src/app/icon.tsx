import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0c2c40 0%, #102f42 55%, #0c2c40 100%)",
          borderRadius: 10,
          border: "2px solid #7fa646",
        }}
      >
        <span
          style={{
            color: "#f4f6f2",
            fontSize: 15,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.05em",
          }}
        >
          {site.shortName}
        </span>
      </div>
    ),
    { ...size }
  );
}
