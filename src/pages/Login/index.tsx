import { useState } from "react";
import { Form, Input, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const onFinish = () => {
    console.log(userId, userPw);
    navigate("/");
  };

  return (
    <>
      <Form
        name="form"
        onFinish={onFinish}
        footer={
          <Button
            disabled={!(userId && userPw)}
            block
            type="submit"
            color="primary"
            size="large"
          >
            로그인
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
            onChange={e => setUserId(e)}
          />
        </Form.Item>
        <Form.Item
          label="비밀번호를 입력해주세요."
          rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
        >
          <Input
            placeholder="비밀번호"
            value={userPw}
            onChange={e => setUserPw(e)}
          />
        </Form.Item>
      </Form>
    </>
  );
};
export default Index;
