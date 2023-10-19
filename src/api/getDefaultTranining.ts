import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import { IDefaultValue } from "../store/setting";

const getDefaultTranining = async (id: string) => {
  if (!id) return;
  try {
    const documentRef = doc(db, "default-traning", id);
    const documentSnapshot = await getDoc(documentRef);
    const data = documentSnapshot.data();

    if (data) {
      return { isSuccess: true, errMsg: "", payload: data as IDefaultValue };
    } else {
      return { isSuccess: true, errMsg: "", payload: null };
    }
  } catch (e) {
    return { isSuccess: false, errMsg: JSON.stringify(e), payload: null };
  }
};

export default getDefaultTranining;
