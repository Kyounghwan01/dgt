import { doc, collection, getDocs } from "firebase/firestore";
import { ITrainingData } from "../store/training";
import { db } from "../index";

interface IGetUserTrainingDataResponse extends ITrainingData {
  timeStamp: string;
}

const getUserTrainingData = async ({
  userId,
  date,
}: {
  userId: string;
  date: string;
}): Promise<
  | { isSuccess: true; errMsg: string; payload: IGetUserTrainingDataResponse[] }
  | { isSuccess: false; errMsg: string; payload: string }
> => {
  try {
    const parentDocRef = doc(db, "training", userId);
    const nestedCollectionRef = collection(parentDocRef, date);

    const querySnapshot = await getDocs(nestedCollectionRef);
    const nestedCollectionData: any = [];
    querySnapshot.forEach((doc) => {
      nestedCollectionData.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { isSuccess: true, errMsg: "", payload: nestedCollectionData };
  } catch (error) {
    console.error("Error getting nested collection data: ", error);
    return { isSuccess: false, errMsg: JSON.stringify(error), payload: "" };
  }
};

export default getUserTrainingData;
