import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrainingStore } from "../../store/training";
import TraningList from "../../components/TraniningList";

const Index = () => {
  const navigate = useNavigate();
  const { timeStamp } = useTrainingStore();

  useEffect(() => {
    if (!timeStamp) {
      navigate("/");
    }
  }, []);

  return <TraningList isEdit={false} />;
};

export default Index;
