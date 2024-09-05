import { redirect } from "next/navigation";

export function redirectToOnboarding() {
  return redirect("/onboarding");
}
