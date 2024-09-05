import { useEffect } from "react";

import { isClient } from "@planria/util/runtime";

/**
 * Attaches an event listener to the window object.
 *
 * @template TEventName The type of the event name.
 * @template TEventListener The type of the event listener function.
 * @param event The name of the event to listen for.
 * @param eventListenerFn The event listener function.
 */
export function useWindowEvent<TEventName extends keyof WindowEventMap>(
  event: TEventName,
  eventListenerFn: (this: Window, ev: WindowEventMap[TEventName]) => any,
  options: AddEventListenerOptions = { passive: true }
) {
  useEffect(() => {
    if (!isClient()) {
      return;
    }

    window.addEventListener(event, eventListenerFn, options);

    return () => {
      window.removeEventListener(event, eventListenerFn, options);
    };
  }, [event, eventListenerFn, options]);
}
