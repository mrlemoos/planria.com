import type { JSX } from "react";

import { cn } from "@planria/design/css";
import Link from "next/link";

export function ClerkTag(): JSX.Element {
  return (
    <Link
      className={cn(
        "rounded-sm text-sm font-medium text-[#6c47ff] bg-zinc-100 dark:bg-zinc-950 px-3 py-1"
      )}
      href="https://clerk.com"
    >
      Proudly secured by <span className="font-semibold">Clerk</span>
    </Link>
  );
}
