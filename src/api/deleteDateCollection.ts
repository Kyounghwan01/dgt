import { collection, deleteDoc, query, getDocs } from "firebase/firestore";
import { db } from "../index";

const deleteDateCollection = async (userId: string, date: string) => {
  try {
    const nestedCollectionRef = collection(db, "training", userId, date);
    const nestedCollectionQuery = query(nestedCollectionRef);

    const querySnapshot = await getDocs(nestedCollectionQuery);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log("All documents in the nested collection have been deleted.");
    return { isSuccess: true, errMsg: "" };
  } catch (error) {
    console.error("Error deleting documents in the nested collection: ", error);
    return { isSuccess: true, errMsg: JSON.stringify(error) };
  }
};

export default deleteDateCollection;
