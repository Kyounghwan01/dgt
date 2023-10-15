import { Form, Input, Checkbox, Button, NavBar, Divider } from "antd-mobile";
import { useTrainingStore, TrainingType } from "../../store/training";
import { HeadNav, BottomBtn, FlexCenter } from "../../style/commonStyle.styled";
import { useNavigate } from "react-router-dom";

const Index = () => {
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
    setTrainData
  } = useTrainingStore();

  const handleInputData = (
    type: string,
    index: number,
    data: string,
    setNumber: number
  ) => {
    setTrainData(type as TrainingType, index, Number(data), setNumber);
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
              onChange={e => setEnduranceData(e)}
              value={enduranceData.isTraining ? 1 : 0}
              defaultChecked={enduranceData.isTraining}
              style={{ "--icon-size": "15px", "--font-size": "15px" }}
            >
              완료여부
            </Checkbox>
          </Form.Item>
        </Form>

        <div style={{ height: "20px" }} />

        {[coreData, balanceData, powerData, shoulderData].map(data => (
          <div key={data.categoryLabelName}>
            <Form requiredMarkStyle="text-required">
              <div
                style={{ padding: "16px", fontSize: "15px", color: "#697b8c" }}
              >
                {data.categoryLabelName}
              </div>
              <Form.Item>
                <Checkbox
                  onChange={e =>
                    setIsTrain(data.categoryName as TrainingType, e)
                  }
                  value={data.isTraining ? 1 : 0}
                  defaultChecked={data.isTraining}
                  style={{ "--icon-size": "15px", "--font-size": "15px" }}
                >
                  완료여부
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
                          onChange={inputData =>
                            handleInputData(
                              data.categoryName,
                              index,
                              inputData,
                              0
                            )
                          }
                          style={{ "--text-align": "center" }}
                        />

                        <Divider direction="vertical" />
                        <Input
                          placeholder={`2 set`}
                          type="number"
                          min={0}
                          onChange={inputData =>
                            handleInputData(
                              data.categoryName,
                              index,
                              inputData,
                              1
                            )
                          }
                          style={{ "--text-align": "center" }}
                        />
                        <Divider direction="vertical" />
                        <Input
                          placeholder={`3 set`}
                          type="number"
                          min={0}
                          onChange={inputData =>
                            handleInputData(
                              data.categoryName,
                              index,
                              inputData,
                              2
                            )
                          }
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
        <Button block color="primary" size="large">
          기입
        </Button>
      </BottomBtn>
    </div>
  );
};

export default Index;
