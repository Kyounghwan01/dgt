import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../index";

const addUsersCollection = async ({
  id,
  pw,
  name,
}: {
  id: string;
  pw: string;
  name: string;
}) => {
  try {
    const documentRef = doc(db, "customer", id);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      return { isSuccess: false, errMsg: "이미 존재 하는 아이디 입니다" };
    } else {
      await setDoc(doc(db, "customer", id), {
        pw,
        isUsable: true,
        name,
      });
      return { isSuccess: true, errMsg: "" };
    }
  } catch (e) {
    return { isSuccess: false, errMsg: JSON.stringify(e) };
  }
};

export default addUsersCollection;
