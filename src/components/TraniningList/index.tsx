import {
  Form,
  Input,
  Checkbox,
  Button,
  NavBar,
  Divider,
  Dialog,
} from "antd-mobile";
import {
  useTrainingStore,
  TrainingType,
  ITraningValue,
} from "../../store/training";
import { useSettingStore } from "../../store/setting";
import { HeadNav, BottomBtn, FlexCenter } from "../../style/commonStyle.styled";
import { useNavigate } from "react-router-dom";
import addDateCollectioon from "../../api/addDateCollectioon";
import deleteDateCollection from "../../api/deleteDateCollection";
import dayjs from "dayjs";
import { useEffect } from "react";

const Index = ({ isEdit }: { isEdit: boolean }) => {
  const navigate = useNavigate();
  const {
    enduranceData,
    coreData,
    powerData,
    balanceData,
    shoulderData,
    trainingDate,
    setEnduranceData,
    setIsTrain,
    setTrainData,
    setInitData,
  } = useTrainingStore();
  const { userId } = useSettingStore();

  useEffect(() => {
    return () => {
      setInitData();
    };
  }, []);

  const handleInputData = (
    type: string,
    index: number,
    data: string,
    setNumber: number
  ) => {
    setTrainData(type as TrainingType, index, Number(data), setNumber);
  };

  const submit = async () => {
    const responseDelete = await deleteDateCollection(userId, trainingDate);

    if (!responseDelete.isSuccess) {
      Dialog.alert({
        content: responseDelete.errMsg,
        confirmText: "확인",
      });
      return;
    }

    let params = {} as ITraningValue;

    [coreData, powerData, balanceData, shoulderData].forEach((data) => {
      const part = data.part.map((part) => {
        return {
          trainingName: part.trainingName,
          value: part.value,
          setCount: part.setCount,
        };
      });
      params = {
        ...params,
        [data.categoryName]: { isTraining: data.isTraining, part },
      };
    });

    params = {
      ...params,
      enduranceData: { isTraining: enduranceData.isTraining },
      timeStamp: dayjs(new Date()).format("YYYY.MM.DD HH:mm"),
    };

    const response = await addDateCollectioon(userId, trainingDate, params);
    if (!response.isSuccess) {
      Dialog.alert({
        content: response.errMsg,
        confirmText: "확인",
      });
      return;
    } else {
      navigate("/");
    }
  };

  const deleteTranining = async () => {
    const responseDelete = await deleteDateCollection(userId, trainingDate);

    if (!responseDelete.isSuccess) {
      Dialog.alert({
        content: responseDelete.errMsg,
        confirmText: "확인",
      });
      return;
    } else {
      Dialog.alert({
        content: "삭제 하였습니다",
        confirmText: "확인",
        onConfirm: () => {
          navigate("/");
        },
      });
    }
  };

  return (
    <div>
      <HeadNav>
        <NavBar onBack={() => navigate(-1)}>{trainingDate} 기록</NavBar>
      </HeadNav>

      <div style={{ padding: "50px 0 100px" }}>
        <div style={{ padding: "16px", fontSize: "15px", color: "#697b8c" }}>
          지구력
        </div>
        <Form requiredMarkStyle="asterisk">
          <Form.Item>
            <Checkbox
              onChange={(e) => setEnduranceData(e)}
              value={enduranceData.isTraining ? 1 : 0}
              defaultChecked={enduranceData.isTraining}
              style={{ "--icon-size": "15px", "--font-size": "15px" }}
              disabled={!isEdit}
            >
              완료여부
            </Checkbox>
          </Form.Item>
        </Form>

        <div style={{ height: "20px" }} />

        {[coreData, balanceData, powerData, shoulderData].map((data) => (
          <div key={data.categoryLabelName}>
            <Form requiredMarkStyle="text-required">
              <div
                style={{ padding: "16px", fontSize: "15px", color: "#697b8c" }}
              >
                {data.categoryLabelName}
              </div>
              <Form.Item>
                <Checkbox
                  onChange={(e) =>
                    setIsTrain(data.categoryName as TrainingType, e)
                  }
                  value={data.isTraining ? 1 : 0}
                  defaultChecked={data.isTraining}
                  style={{ "--icon-size": "15px", "--font-size": "15px" }}
                  disabled={!isEdit}
                >
                  완료여부
                </Checkbox>
              </Form.Item>
              {data.isTraining && (
                <>
                  {data.part.map((part, index) => (
                    <Form.Item
                      key={part.trainingLabelName}
                      label={`${part.trainingLabelName} ex) 10${part.scale}`}
                      help={`휴식시간 ${part.restTime}, ${part.defaultSet}세트, 최소 ${part.defaultValue}`}
                    >
                      <FlexCenter>
                        <Input
                          placeholder={`1 set`}
                          type="number"
                          min={0}
                          disabled={!isEdit}
                          onChange={(inputData) =>
                            handleInputData(
                              data.categoryName,
                              index,
                              inputData,
                              0
                            )
                          }
                          defaultValue={String(part.value[0])}
                          style={{ "--text-align": "center" }}
                        />

                        <Divider direction="vertical" />
                        <Input
                          placeholder={`2 set`}
                          type="number"
                          min={0}
                          disabled={!isEdit}
                          onChange={(inputData) =>
                            handleInputData(
                              data.categoryName,
                              index,
                              inputData,
                              1
                            )
                          }
                          defaultValue={String(part.value[1])}
                          style={{ "--text-align": "center" }}
                        />
                        <Divider direction="vertical" />
                        <Input
                          placeholder={`3 set`}
                          type="number"
                          min={0}
                          disabled={!isEdit}
                          onChange={(inputData) =>
                            handleInputData(
                              data.categoryName,
                              index,
                              inputData,
                              2
                            )
                          }
                          defaultValue={String(part.value[2])}
                          style={{ "--text-align": "center" }}
                        />
                      </FlexCenter>
                    </Form.Item>
                  ))}
                </>
              )}
            </Form>
            <div style={{ height: "20px" }} />
          </div>
        ))}
      </div>

      <BottomBtn>
        {isEdit ? (
          <Button block color="primary" size="large" onClick={submit}>
            기입
          </Button>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <Button
              block
              color="primary"
              size="large"
              shape="rectangular"
              onClick={() => navigate("/insert")}
            >
              수정
            </Button>
            <Button
              block
              color="danger"
              size="large"
              shape="rectangular"
              onClick={deleteTranining}
            >
              삭제
            </Button>
          </div>
        )}
      </BottomBtn>
    </div>
  );
};

export default Index;

// 처음들어오고 나가면 init으로 초기화
// 두번째 들어올때는 들어오면 값 매칭 나갈때는 초기화
