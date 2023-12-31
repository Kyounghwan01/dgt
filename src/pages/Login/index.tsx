import { useState } from "react";
import { Form, Input, Button, Dialog } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import getUsers from "../../api/getUsers";
import { useSettingStore } from "../../store/setting";

const Index = () => {
  const navigate = useNavigate();
  const { setIsLogin, setUserName } = useSettingStore();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const checkPassword = async () => {
    const { isSuccess, errMsg, payload } = await getUsers({
      id: userId,
      password: userPw,
    });
    if (!isSuccess) {
      Dialog.alert({
        content: errMsg,
        title: "로그인 실패",
        confirmText: "확인",
      });
    } else {
      setIsLogin(true);
      setUserName(payload.id, payload.name);
      navigate("/");
    }
  };

  return (
    <>
      <Form
        name="form"
        onFinish={checkPassword}
        footer={
          <Button
            disabled={!(userId && userPw)}
            block
            type="submit"
            color="primary"
            size="middle"
            onClick={checkPassword}
          >
            로그인
          </Button>
        }
      >
        <Form.Header>트레이닝 노트북</Form.Header>
        <Form.Item
          label="아이디를 입력해주세요."
          rules={[{ required: true, message: "아이디를 입력해주세요." }]}
        >
          <Input
            placeholder="아이디 입력"
            value={userId}
            onChange={(e) => setUserId(e)}
          />
        </Form.Item>
        <Form.Item
          label="비밀번호를 입력해주세요."
          rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
        >
          <Input
            placeholder="비밀번호"
            value={userPw}
            onChange={(e) => setUserPw(e)}
          />
        </Form.Item>
      </Form>
      <div style={{ padding: "0 12px" }}>
        <Button
          onClick={() => navigate("/sign-up")}
          block
          type="submit"
          color="primary"
          size="middle"
        >
          회원가입
        </Button>
      </div>
    </>
  );
};
export default Index;
