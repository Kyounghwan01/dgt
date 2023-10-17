import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Divider, Button, Dialog, Calendar, List } from "antd-mobile";
import { BottomBtn } from "../../style/commonStyle.styled";
import { useTrainingStore, ITrainingData } from "../../store/training";
import { useSettingStore } from "../../store/setting";
import getUserTrainingData from "../../api/getUserTrainingData";

const Index = () => {
  const navigate = useNavigate();
  const {
    trainingDate,
    setTrainingDate,
    setTimeStamp,
    timeStamp,
    coreData,
    powerData,
    balanceData,
    shoulderData,
    enduranceData,
    setAllTraniningData,
    setInitData,
  } = useTrainingStore();
  const { userId } = useSettingStore();

  useEffect(() => {
    if (!trainingDate) {
      handleChangeInsertDate(new Date());
      return;
    }

    getTrainingData();
  }, [trainingDate]);

  const getTrainingData = async () => {
    const response = await getUserTrainingData({ userId, date: trainingDate });
    if (response.isSuccess && response.payload.length) {
      setTimeStamp(response.payload[0].timeStamp);

      let params = {} as ITrainingData;
      [coreData, powerData, balanceData, shoulderData].forEach((data) => {
        // @ts-ignore
        const currentPart = response.payload[0][data.categoryName];

        const part = data.part.map((el) => {
          const dbValue = currentPart.part.find(
            (els: { trainingName: string }) =>
              els.trainingName === el.trainingName
          );
          return { ...el, value: dbValue ? dbValue.value : [] };
        });
        const newData = {
          ...data,
          isTraining: currentPart.isTraining,
          part,
        };

        params = { ...params, [data.categoryName]: newData };
      });

      params.enduranceData = {
        ...enduranceData,
        isTraining: response.payload[0].enduranceData.isTraining,
      };

      setAllTraniningData(params);
    }

    if (response.isSuccess && !response.payload.length) {
      setTimeStamp("");
      setInitData();
    }

    if (!response.isSuccess) {
      Dialog.alert({
        content: response.errMsg,
        title: "로그인 실패",
        confirmText: "확인",
      });
    }
  };

  const handleChangeInsertDate = (date: Date | null) => {
    if (!date) return;
    setTrainingDate(dayjs(date).format("YYYYMMDD"));
  };

  return (
    <>
      <div style={{ paddingBottom: "50px" }}>
        <Calendar
          selectionMode="single"
          onChange={(val) => {
            handleChangeInsertDate(val);
          }}
          defaultValue={
            new Date(
              dayjs(trainingDate ? trainingDate : new Date()).format(
                "YYYY-MM-DD"
              )
            )
          }
        />
        <Divider />

        {timeStamp && (
          <List>
            <List.Item
              onClick={() => navigate("/traning-detail")}
              description={timeStamp}
              extra={<div>완료</div>}
            >
              {userId}
            </List.Item>
          </List>
        )}
      </div>

      {!timeStamp && (
        <BottomBtn>
          <Button
            onClick={() => navigate("/insert")}
            block
            color="primary"
            size="large"
            disabled={!trainingDate}
          >
            기입
          </Button>
        </BottomBtn>
      )}
    </>
  );
};

export default Index;
