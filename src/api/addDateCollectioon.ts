import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../index";
import { ITraningValue } from "../store/training";

const addDateCollectioon = async (
  userId: string,
  date: string,
  trainingData: ITraningValue
) => {
  try {
    const parentDocRef = doc(db, "training", userId);
    const nestedCollectionRef = collection(parentDocRef, date);

    await addDoc(nestedCollectionRef, trainingData);
    return { isSuccess: true, errMsg: "" };
  } catch (error) {
    console.error("Error adding data to the nested collection: ", error);
    return { isSuccess: false, errMsg: JSON.stringify(error) };
  }
};

export default addDateCollectioon;
