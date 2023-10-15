export const initTrainingData = {
  enduranceData: {
    isTraining: true,
    categoryLabelName: "지구력",
    description: "초록 난이도 5분 2~3세트"
  },
  coreData: {
    isTraining: true,
    categoryLabelName: "코어",
    categoryName: "coreData",
    part: [
      {
        trainingName: "plank",
        trainingLabelName: "플랭크",
        setCount: 1,
        scale: "초",
        value: ["", "", ""],
        restTime: "30초",
        defaultValue: "60초",
        defaultSet: 3
      },
      {
        trainingName: "gymRing",
        trainingLabelName: "짐링",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "1분",
        defaultValue: "10개",
        defaultSet: 3
      },
      {
        trainingName: "hanging",
        trainingLabelName: "행잉레그레이즈",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "1분",
        defaultValue: "20개",
        defaultSet: 3
      }
    ]
  },
  powerData: {
    isTraining: true,
    categoryLabelName: "힘",
    categoryName: "powerData",
    part: [
      {
        trainingName: "chinBlow",
        trainingLabelName: "턱걸이",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "1분30초",
        defaultValue: "15개",
        defaultSet: 3
      },
      {
        trainingName: "pushup",
        trainingLabelName: "푸시업",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "1분30초",
        defaultValue: "20개",
        defaultSet: 3
      },
      {
        trainingName: "leftLockOff",
        trainingLabelName: "왼손락오프",
        setCount: 1,
        scale: "초",
        value: ["", "", ""],
        restTime: "1분",
        defaultSet: 3,
        defaultValue: "없음"
      },
      {
        trainingName: "rightLockOff",
        trainingLabelName: "오른손락오프",
        setCount: 1,
        scale: "초",
        value: ["", "", ""],
        restTime: "1분",
        defaultSet: 3,
        defaultValue: "없음"
      }
    ]
  },
  balanceData: {
    isTraining: true,
    categoryLabelName: "하체&밸런스",
    categoryName: "balanceData",
    part: [
      {
        trainingName: "leftSqurt",
        trainingLabelName: "왼발스쿼트",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "1분",
        defaultValue: "10개",
        defaultSet: 3
      },
      {
        trainingName: "rightSqurt",
        trainingLabelName: "오른발스쿼트",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "1분",
        defaultValue: "10개",
        defaultSet: 3
      },
      {
        trainingName: "balanceBoard",
        trainingLabelName: "밸런스보드",
        setCount: 1,
        scale: "초",
        value: ["", "", ""],
        restTime: "없음",
        defaultValue: "최대시간",
        defaultSet: 3
      }
    ]
  },
  shoulderData: {
    isTraining: true,
    categoryLabelName: "어깨안정성",
    categoryName: "shoulderData",
    part: [
      {
        trainingName: "outSpinBand",
        trainingLabelName: "양쪽외회전밴드",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "없음",
        defaultValue: "10개",
        defaultSet: 3
      },
      {
        trainingName: "innerSpinBand",
        trainingLabelName: "내회전밴드(좌우)",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "없음",
        defaultValue: "10개",
        defaultSet: 3
      },
      {
        trainingName: "outSpinUpDownBand",
        trainingLabelName: "외회전밴드(상하)",
        setCount: 1,
        scale: "개",
        value: ["", "", ""],
        restTime: "없음",
        defaultValue: "10개",
        defaultSet: 3
      }
    ]
  }
};
