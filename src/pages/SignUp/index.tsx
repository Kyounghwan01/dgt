import { useState } from "react";
import { Form, Input, Button, Dialog } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import addUsersCollection from "../../api/addUsersCollection";
import { useSettingStore } from "../../store/setting";

const Index = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useSettingStore();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPw, setUserPw] = useState("");

  const onFinish = async () => {
    const { isSuccess, errMsg } = await addUsersCollection({
      id: userId,
      pw: userPw,
      name: userName,
    });
    if (isSuccess) {
      setIsLogin(true);
      localStorage.setItem(
        "training-tool",
        JSON.stringify({
          id: userId,
          lastLogin: dayjs(new Date()).format("YYYYMMDD"),
          name: userName,
        })
      );
      navigate("/");
    } else {
      Dialog.alert({
        content: errMsg,
        title: "회원가입실패",
        confirmText: "확인",
      });
    }
  };

  return (
    <>
      <Form
        name="form"
        onFinish={onFinish}
        footer={
          <Button
            disabled={!(userId && userPw && userName)}
            block
            type="submit"
            color="primary"
            size="large"
          >
            회원가입
          </Button>
        }
      >
        <Form.Header>트레이닝 노트북 회원가입</Form.Header>
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
          label="이름을 입력해주세요."
          rules={[{ required: true, message: "이름을 입력해주세요." }]}
        >
          <Input
            placeholder="이름 입력"
            value={userName}
            onChange={(e) => setUserName(e)}
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
    </>
  );
};
export default Index;
