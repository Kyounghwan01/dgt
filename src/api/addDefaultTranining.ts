import { doc, setDoc } from "firebase/firestore";
import { db } from "../index";
import { IDefaultValue } from "../store/setting";

const addDefaultTranining = async (userId: string, data: IDefaultValue) => {
  try {
    await setDoc(doc(db, "default-traning", userId), data);
    return { isSuccess: true, errMsg: "" };
  } catch (error) {
    return { isSuccess: false, errMsg: JSON.stringify(error) };
  }
};

export default addDefaultTranining;
