import { Form, Input, Checkbox, Button, NavBar, Divider } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar onBack={() => navigate(-1)}>awd 기록</NavBar>
    </div>
  );
};

export default Index;
