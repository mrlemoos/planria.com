import { redirect } from "next/navigation";

export function Page(): never {
  return redirect("https://github.com/mrlemoos/planria.com");
}
