import { useEffect } from "react";

export interface UseBackdropWheelPreventionEffectOptions {
  element?: HTMLElement;
}

export function useBackdropWheelPreventionEffect(prevent: boolean) {
  useEffect(() => {
    if (typeof document === "undefined" || prevent) {
      return;
    }

    function handleBackdropWheelPrevention() {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
    }

    function handleResumeBackdropWheel() {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    if (prevent) {
      handleBackdropWheelPrevention();
    } else {
      handleResumeBackdropWheel();
    }

    return () => {
      handleResumeBackdropWheel();
    };
  }, [prevent]);
}
