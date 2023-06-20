// For saving data (new Item)

import { doc, setDoc } from "firebase/firestore";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveItem = async (data) => {
  // doc to create a new document
  // setDoc is a firebase/firestore method which will set the newly doc or update existing doc in firebase firestore
  // firestore is a place of data from  firbase coming shoppingitems is collection name date is unique id data which is coming
  // merge is that in future if you are updating any field than that will be merged or else firebase will show error

  await setDoc(doc(firestore, "shoppingitems", `${Date.now()}`), data, {
    merge: true,
  });
};

export const shoppedItem = async (data) => {
  // doc to create a new document
  // setDoc is a firebase/firestore method which will set the newly doc or update existing doc in firebase firestore
  // firestore is a place of data from  firbase coming shoppingitems is collection name date is unique id data which is coming
  // merge is that in future if you are updating any field than that will be merged or else firebase will show error

  await setDoc(doc(firestore, "boughtProducts", `${Date.now()}`), data, {
    merge: true,
  });
};

//get itemas of shopping items that owner added
export const getAllItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "shoppingitems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

//get products bought by users
export const myOrders = async () => {
  const items = await getDocs(
    query(collection(firestore, "boughtProducts"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
