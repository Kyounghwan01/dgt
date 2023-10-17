import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ISettingStore = {
  isDarkMode: boolean;
  isLogin: boolean;
  userId: string;
  userName: string;
  setIsDartMode: () => void;
  setIsLogin: (data: boolean) => void;
  setUserName: (name: string, id: string) => void;
};

export const useSettingStore = create<ISettingStore>()(
  immer((set) => ({
    isDarkMode: true,
    isLogin: true,
    userName: "",
    userId: "",
    setIsDartMode: () =>
      set((state) => {
        state.isDarkMode = !state.isDarkMode;
      }),
    setIsLogin: (data) =>
      set((state) => {
        state.isLogin = data;
      }),
    setUserName: (name, id) => {
      set((state) => {
        state.userName = name;
        state.userId = id;
      });
    },
  }))
);
