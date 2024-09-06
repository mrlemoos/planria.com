import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon(): Response {
  return new ImageResponse(
    (
      <span
        style={{
          backgroundColor: "#141414",
          color: "#fff",
          width: "100%",
          height: "100%",
          fontFamily:
            '"Inter". "San Francisco", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: 24,
          fontWeight: 700,
          borderStyle: "solid",
          borderWidth: 2,
          borderColor: "rgba(12, 12, 12, 0.3)",
          position: "relative",
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            position: "relative",
            bottom: 4,
          }}
        >
          p
        </span>
      </span>
    ),
    { ...size }
  );
}
