import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import dayjs from "dayjs";

const getUsers = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<
  | { isSuccess: true; errMsg: string; payload: { id: string; name: string } }
  | { isSuccess: false; errMsg: string; payload: string }
> => {
  const documentRef = doc(db, "customer", id);
  const documentSnapshot = await getDoc(documentRef);

  if (documentSnapshot.exists()) {
    const response = documentSnapshot.data() as {
      pw: string;
      name: string;
      id: string;
    };
    if (response.pw === password) {
      localStorage.setItem(
        "training-tool",
        JSON.stringify({
          id: id,
          lastLogin: dayjs(new Date()).format("YYYYMMDD"),
          name: response.name,
        })
      );
      return {
        isSuccess: true,
        errMsg: "",
        payload: { id, name: response.name },
      };
    }
    return { isSuccess: false, errMsg: "비밀번호가 다릅니다", payload: "" };
  }
  return { isSuccess: false, errMsg: "없는 계정입니다.", payload: "" };
};

export default getUsers;
