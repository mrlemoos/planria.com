import type { JSX } from "react";

import { cn } from "@planria/design/css";
import Link from "next/link";

export function ClerkTag(): JSX.Element {
  return (
    <Link
      className={cn("rounded text-sm font-medium bg-[#6c47ff] text-white")}
      href="https://clerk.com"
    >
      Proudly secured by Clerk
    </Link>
  );
}
