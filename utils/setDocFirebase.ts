import { db } from "../src/index";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";

interface IsetDocFirebase {
  dbColumn: string;
  dbKey?: string;
  payload: any;
  setType: "selectKey" | "anonymous";
}

const setDocFirebase = async ({
  dbColumn,
  dbKey = "",
  payload,
  setType = "selectKey"
}: IsetDocFirebase) => {
  try {
    if (setType === "selectKey") {
      await setDoc(doc(db, dbColumn, dbKey), payload, { merge: true });
      return { isSuccess: true, id: "" };
    } else {
      const res = await addDoc(collection(db, dbColumn), payload);
      return { isSuccess: true, id: res.id };
    }
  } catch (e) {
    return { isSuccess: false, errMessage: JSON.stringify(e) };
  }
};

/*
setDocFirebase({
      dbColumn: `chat-message/${chatId}/message`,
      setType: "anonymous",
      payload: {
        content: text,
        img: "",
        sendBy: "2042204892",
        timestamp: new Date().getTime()
      }
    });
    */

export default setDocFirebase;
