import { useEffect, useLayoutEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSettingStore } from "./store/setting";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Insert from "./pages/Insert";
import SignUp from "./pages/SignUp";
import SettingData from "./pages/SettingData";
import TraningDetail from "./pages/TraniningDetail";

const Index = () => {
  const { isDarkMode, setIsLogin, isLogin, setUserName } = useSettingStore();

  useEffect(() => {
    const response = localStorage.getItem("training-tool");
    // todo: 1달이상이면 로그아웃, 스토리지 지우기
    setIsLogin(response ? true : false);
    if (response) {
      const { id, name } = JSON.parse(response);
      setUserName(id, name);
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-prefers-color-scheme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const ProtectedRoute = ({ redirectPath = "/login" }) => {
    if (!isLogin) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Main />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/traning-detail" element={<TraningDetail />} />
            <Route path="/settings" element={<SettingData />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Index;
