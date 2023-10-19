import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, NavBar, Dialog } from "antd-mobile";
import { useSettingStore, IDefaultValue } from "../../store/setting";
import addDefaultTranining from "../../api/addDefaultTranining";

const Index = () => {
  const navigate = useNavigate();
  const { setDefaultTranining, defaultTraniningData, userId } =
    useSettingStore();
  const [defaultValue, setDefaultValue] = useState(defaultTraniningData);

  const onChangeDefaultValues = (type: keyof IDefaultValue, value: string) => {
    console.log(type, value);
    setDefaultValue({ ...defaultValue, [type]: value });
  };

  const onFinish = async () => {
    setDefaultTranining(defaultValue);
    if (Object.values(defaultValue).every((e) => !!e)) {
      const response = await addDefaultTranining(userId, defaultValue);
      if (response.isSuccess) {
        Dialog.alert({
          content: "저장되었습니다",
          confirmText: "확인",
          onConfirm: () => {
            navigate("/");
          },
        });
      } else {
        Dialog.alert({
          content: response.errMsg,
          confirmText: "확인",
        });
      }
    } else {
      Dialog.alert({
        content: "빈 데이터가 있습니다.",
        confirmText: "확인",
      });
      return;
    }
  };
  return (
    <div>
      <NavBar onBack={() => navigate(-1)}>설정</NavBar>
      <Form
        layout="horizontal"
        mode="card"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            저장
          </Button>
        }
      >
        <Form.Header>운동 설정값</Form.Header>
        <Form.Item label="플랭크 (초)">
          <Input
            placeholder="60"
            type="number"
            onChange={(e) => onChangeDefaultValues("plank", e)}
            value={defaultValue.plank}
          />
          <div style={{ display: "none" }}>{defaultValue.plank}</div>
        </Form.Item>
        <Form.Item label="짐링 (개)">
          <div style={{ display: "none" }}>{defaultValue.gymRing}</div>
          <Input
            type="number"
            placeholder="10"
            value={defaultValue.gymRing}
            onChange={(e) => onChangeDefaultValues("gymRing", e)}
          />
        </Form.Item>
        <Form.Header />
        <Form.Item label="행잉레그레이즈 (개)">
          <div style={{ display: "none" }}>{defaultValue.hanging}</div>
          <Input
            type="number"
            placeholder="20"
            onChange={(e) => onChangeDefaultValues("hanging", e)}
            value={defaultValue.hanging}
          />
        </Form.Item>
        <Form.Header />
        <Form.Item label="턱걸이 (개)">
          <div style={{ display: "none" }}>{defaultValue.chinBlow}</div>
          <Input
            type="number"
            placeholder="15"
            onChange={(e) => onChangeDefaultValues("chinBlow", e)}
            value={defaultValue.chinBlow}
          />
        </Form.Item>
        <Form.Item label="푸시업 (개)">
          <div style={{ display: "none" }}>{defaultValue.pushup}</div>
          <Input
            type="number"
            placeholder="20"
            onChange={(e) => onChangeDefaultValues("pushup", e)}
            value={defaultValue.pushup}
          />
        </Form.Item>

        <Form.Header />
        <Form.Item label="왼발스쿼트 (개)">
          <div style={{ display: "none" }}>{defaultValue.leftSqurt}</div>
          <Input
            type="number"
            placeholder="10"
            onChange={(e) => onChangeDefaultValues("leftSqurt", e)}
            value={defaultValue.leftSqurt}
          />
        </Form.Item>
        <Form.Item label="오른발스쿼트 (개)">
          <div style={{ display: "none" }}>{defaultValue.rightSqurt}</div>
          <Input
            type="number"
            placeholder="10"
            onChange={(e) => onChangeDefaultValues("rightSqurt", e)}
            value={defaultValue.rightSqurt}
          />
        </Form.Item>

        <Form.Header />
        <Form.Item label="양쪽외회전밴드 (개)">
          <div style={{ display: "none" }}>{defaultValue.outSpinBand}</div>
          <Input
            type="number"
            placeholder="10"
            onChange={(e) => onChangeDefaultValues("outSpinBand", e)}
            value={defaultValue.outSpinBand}
          />
        </Form.Item>
        <Form.Item label="내회전밴드(좌우) (개)">
          <div style={{ display: "none" }}>{defaultValue.leftSqurt}</div>
          <Input
            type="number"
            placeholder="10"
            onChange={(e) => onChangeDefaultValues("leftSqurt", e)}
            value={defaultValue.leftSqurt}
          />
        </Form.Item>
        <Form.Item label="외회전밴드(상하) (개)">
          <div style={{ display: "none" }}>
            {defaultValue.outSpinUpDownBand}
          </div>
          <Input
            type="number"
            placeholder="10"
            onChange={(e) => onChangeDefaultValues("outSpinUpDownBand", e)}
            value={defaultValue.outSpinUpDownBand}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
