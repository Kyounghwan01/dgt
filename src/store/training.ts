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

interface ITrainingStore {
  trainingDate: string;
  coreData: ICategory;
  powerData: ICategory;
  balanceData: ICategory;
  shoulderData: ICategory;
  enduranceData: {
    isTraining: boolean;
    categoryLabelName: string;
    description: string;
  };
  setTrainingDate: (date: string) => void;
  setEnduranceData: (data: boolean) => void;
  setIsTrain: (type: TrainingType, data: boolean) => void;
  setTrainData: (
    type: TrainingType,
    trainIndex: number,
    data: number,
    setCount: number
  ) => void;
}

export const useTrainingStore = create<ITrainingStore>()(
  immer(set => ({
    trainingDate: "",
    ...initTrainingData,
    setTrainingDate: date =>
      set(state => {
        state.trainingDate = date;
      }),
    setEnduranceData: data =>
      set(state => {
        state.enduranceData.isTraining = data;
      }),
    setIsTrain: (type, data) =>
      set(state => {
        state[type].isTraining = data;
      }),
    setTrainData: (type, trainIndex, data, setNumber) =>
      set(state => {
        state[type].part[trainIndex].value[setNumber] = data;
      })
  }))
);
