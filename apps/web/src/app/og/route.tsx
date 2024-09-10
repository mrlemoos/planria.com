import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const monaSansMediumFont = fetch(
  new URL("./MonaSans-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const monaSansBoldFont = fetch(
  new URL("./MonaSans-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(
  _request: NextRequest,
  context: {
    searchParams?: {
      height?: `${number}`;
      width?: `${number}`;
      debug?: "true";
    };
  }
): Promise<Response> {
  const width = context.searchParams?.width
    ? parseInt(context.searchParams?.width)
    : 800;
  const height = context.searchParams?.height
    ? parseInt(context.searchParams?.height)
    : 400;

  const [fontMedium, fontBold] = await Promise.all([
    monaSansMediumFont,
    monaSansBoldFont,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "MonaSans",
          fontWeight: 500,
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundColor: "white",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #d9385480 1%, transparent 0%), radial-gradient(circle at 75px 75px, #d9385480 1%, transparent 0%)",
          backgroundSize: "100px 100px",
          border: "1px solid lightgray",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="160"
            height="160"
            viewBox="0 0 568 568"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "flex" }}
          >
            <circle
              cx="284"
              cy="284"
              r="269"
              fill="#fff"
              stroke="#34343450"
              stroke-width="30"
            />
            <path
              d="M212.413 418.364V193.364H243.521V219.891H246.185C248.031 216.482 250.695 212.54 254.175 208.065C257.655 203.591 262.484 199.685 268.663 196.347C274.842 192.938 283.01 191.233 293.166 191.233C306.376 191.233 318.166 194.571 328.536 201.247C338.905 207.923 347.037 217.547 352.932 230.118C358.898 242.689 361.881 257.817 361.881 275.501C361.881 293.186 358.933 308.349 353.038 320.991C347.143 333.562 339.047 343.257 328.749 350.075C318.45 356.822 306.696 360.196 293.486 360.196C283.543 360.196 275.411 358.527 269.089 355.189C262.839 351.851 257.939 347.945 254.388 343.47C250.837 338.996 248.102 335.018 246.185 331.538H244.267V418.364H212.413ZM243.628 275.182C243.628 286.687 245.297 296.773 248.635 305.438C251.973 314.102 256.803 320.885 263.124 325.786C269.445 330.615 277.186 333.03 286.348 333.03C295.865 333.03 303.82 330.509 310.212 325.466C316.604 320.352 321.433 313.428 324.7 304.692C328.038 295.956 329.707 286.119 329.707 275.182C329.707 264.386 328.074 254.692 324.807 246.098C321.611 237.504 316.781 230.722 310.318 225.75C303.926 220.778 295.936 218.293 286.348 218.293C277.115 218.293 269.303 220.672 262.911 225.43C256.589 230.189 251.795 236.83 248.528 245.352C245.261 253.875 243.628 263.818 243.628 275.182Z"
              fill="black"
            />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            color: "black",
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
            padding: 24,
            borderRadius: 8,
            backgroundColor: "#ffffff",
          }}
        >
          <b>planria</b>
        </div>
        <div
          style={{
            marginTop: 32,
          }}
        >
          Your feature flags. Fast. Instant. On the edge 🚀
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "MonaSans",
          data: fontMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "MonaSans",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
      ],
      debug:
        process.env.NODE_ENV === "development" &&
        context.searchParams?.debug === "true",
      emoji: "openmoji",
      height,
      width,
    }
  );
}
