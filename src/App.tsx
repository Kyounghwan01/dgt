import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSettingStore } from "./store/setting";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Insert from "./pages/Insert";

const Index = () => {
  const { isDarkMode } = useSettingStore();
  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-prefers-color-scheme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/insert" element={<Insert />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Index;
