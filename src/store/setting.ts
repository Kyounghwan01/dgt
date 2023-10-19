import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
export interface IDefaultValue {
  plank: string;
  gymRing: string;
  hanging: string;
  chinBlow: string;
  pushup: string;
  leftSqurt: string;
  rightSqurt: string;
  outSpinBand: string;
  innerSpinBand: string;
  outSpinUpDownBand: string;
}

interface ISettingStore {
  isDarkMode: boolean;
  isLogin: boolean;
  userId: string;
  userName: string;
  defaultTraniningData: IDefaultValue;
  setIsDartMode: () => void;
  setIsLogin: (data: boolean) => void;
  setUserName: (name: string, id: string) => void;
  setDefaultTranining: (data: IDefaultValue) => void;
}

export const useSettingStore = create<ISettingStore>()(
  immer((set) => ({
    isDarkMode: true,
    isLogin: true,
    userName: "",
    userId: "",
    defaultTraniningData: {
      plank: "60",
      gymRing: "10",
      hanging: "20",
      chinBlow: "15",
      pushup: "20",
      leftSqurt: "10",
      rightSqurt: "10",
      outSpinBand: "10",
      innerSpinBand: "10",
      outSpinUpDownBand: "10",
    },

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
    setDefaultTranining: (data) =>
      set((state) => {
        console.log(data);
        state.defaultTraniningData = data;
      }),
  }))
);
