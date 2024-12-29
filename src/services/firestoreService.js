import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");

// Function to get all users
const getUsers = async () => {
  const data = await getDocs(userCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Function to add a new user
const addUser = async (newUser) => {
  return await addDoc(userCollectionRef, newUser);
};

// Function to edit an existing user
const editUser = async (userId, updatedUserData) => {
  const userDocRef = doc(db, "users", userId);
  return await updateDoc(userDocRef, updatedUserData);
};

export { getUsers, addUser, editUser };
