import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { initTrainingData } from "../data";

export type TrainingType =
  | "coreData"
  | "powerData"
  | "balanceData"
  | "shoulderData";

interface IPart {
  trainingName: string;
  trainingLabelName: string;
  setCount: number;
  value: (number | string)[];
  scale: string;
  restTime: string;
  defaultValue?: string;
  defaultSet?: number;
}

interface ICategory {
  isTraining: boolean;
  categoryLabelName: string;
  part: IPart[];
  categoryName: string;
}

export interface ITrainingData {
  coreData: ICategory;
  powerData: ICategory;
  balanceData: ICategory;
  shoulderData: ICategory;
  weight: number;
}

interface ITrainingStore extends ITrainingData {
  trainingDate: string;
  timeStamp: string;
  setTrainingDate: (date: string) => void;
  setWeight: (data: number) => void;
  setIsTrain: (type: TrainingType, data: boolean) => void;
  setTrainData: (
    type: TrainingType,
    trainIndex: number,
    data: number,
    setCount: number
  ) => void;
  setTimeStamp: (date: string) => void;
  setInitData: () => void;
  setAllTraniningData: (data: ITrainingData) => void;
}

// 백엔드 호출 params, response
interface IR {
  isTraining: boolean;
  part: { traningName: string; value: (string | number)[]; setCount: number }[];
}

export interface ITraningValue {
  coreData: IR;
  powerData: IR;
  balanceData: IR;
  shoulderData: IR;
  weight: number;
  timeStamp: string;
}

export const useTrainingStore = create<ITrainingStore>()(
  immer((set) => ({
    trainingDate: "",
    timeStamp: "",
    ...initTrainingData,
    setTrainingDate: (date) =>
      set((state) => {
        state.trainingDate = date;
      }),
    setIsTrain: (type, data) =>
      set((state) => {
        state[type].isTraining = data;
        if (!data) {
          state[type].part = initTrainingData[type].part;
        }
      }),
    setTrainData: (type, trainIndex, data, setNumber) =>
      set((state) => {
        state[type].part[trainIndex].value[setNumber] = data;
      }),
    setTimeStamp: (date) => {
      set((state) => {
        state.timeStamp = date;
      });
    },
    setInitData: () => {
      set((state) => {
        state.balanceData = initTrainingData.balanceData;
        state.coreData = initTrainingData.coreData;
        state.shoulderData = initTrainingData.shoulderData;
        state.powerData = initTrainingData.powerData;
        state.weight = initTrainingData.weight;
      });
    },
    setAllTraniningData: (data) => {
      set((state) => {
        state.balanceData = data.balanceData;
        state.coreData = data.coreData;
        state.shoulderData = data.shoulderData;
        state.powerData = data.powerData;
        state.weight = data.weight;
      });
    },
    setWeight: (data) => {
      set((state) => {
        state.weight = data;
      });
    },
  }))
);
