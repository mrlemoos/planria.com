import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { SIDEBAR_PERSISTANCE_KEY } from "./constants";

export interface SidebarToggleStore {
  isSidebarOpen: boolean;
  toggleSidebar(): void;
}

export const useSidebarToggle = create(
  persist<SidebarToggleStore>(
    (set, get) => ({
      isSidebarOpen: true,
      toggleSidebar() {
        set({ isSidebarOpen: !get().isSidebarOpen });
      },
    }),
    {
      name: SIDEBAR_PERSISTANCE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
