import { ImageResponse } from "next/og";

export default function Icon(): Response {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "1rem",
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: "1.5rem",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        p
      </div>
    )
  );
}
