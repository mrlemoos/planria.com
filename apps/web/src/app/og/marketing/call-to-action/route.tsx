import { ImageResponse } from "next/og";

export const runtime = "edge";

const monaSansMediumFont = fetch(
  new URL("../../MonaSans-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const monaSansBoldFont = fetch(
  new URL("../../MonaSans-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(): Promise<Response> {
  const [fontMedium, fontBold] = await Promise.all([
    monaSansMediumFont,
    monaSansBoldFont,
  ]);

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="bg-gray-50 flex w-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span>Ready to ship feature flags like never before?</span>
              <span tw="text-rose-600">Start your free trial today.</span>
            </h2>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-3xl shadow">
                <a tw="flex items-center justify-center rounded-full border border-transparent bg-rose-600 px-5 py-3 text-base font-bold text-white">
                  Get started
                </a>
              </div>
            </div>
          </div>
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
    }
  );
}
