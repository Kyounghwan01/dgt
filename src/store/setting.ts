import { create } from "zustand";

type ISettingStore = {
  isDarkMode: boolean;
  setIsDartMode: () => void;
};

export const useSettingStore = create<ISettingStore>()(set => ({
  isDarkMode: true,
  setIsDartMode: () => set(state => ({ isDarkMode: !state.isDarkMode }))
}));
