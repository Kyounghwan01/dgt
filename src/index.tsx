import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd-mobile";
import { getFirestore } from "firebase/firestore";

import koKR from "antd-mobile/es/locales/ko-KR";
import { collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
async function getCities() {
  const usersCollectionRef = collection(db, "users");
  console.log(usersCollectionRef);
  const q = await query(usersCollectionRef, where("nickName", "==", "빡쏘오"));
  const data = await getDocs(q);
  const userData = data.docs.map(doc => ({
    ...doc.data()
  }));
  console.log(userData);
  return usersCollectionRef;
}
getCities();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={koKR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
reportWebVitals();
