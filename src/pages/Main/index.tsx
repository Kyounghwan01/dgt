import { Calendar } from "antd-mobile";
import { Divider, Button } from "antd-mobile";
import { BottomBtn } from "../../style/commonStyle.styled";
import { useTrainingStore } from "../../store/training";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Index = () => {
  const navigate = useNavigate();
  const { trainingDate, setTrainingDate } = useTrainingStore();

  const handleChangeInsertDate = (date: Date | null) => {
    if (!date) return;
    setTrainingDate(dayjs(date).format("YYYYMMDD"));
  };

  return (
    <>
      <div style={{ paddingBottom: "50px" }}>
        <Calendar
          selectionMode="single"
          onChange={val => {
            handleChangeInsertDate(val);
          }}
        />
        <Divider />
      </div>

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
    </>
  );
};

export default Index;
