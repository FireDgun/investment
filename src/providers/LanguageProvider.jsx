import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../firebase-config";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [user, setUser] = useState({
    lan: "",
    type: "",
    readingAnswer1: "",
    readingAnswer2: "",
    isCorrectReadingAnswer1: "",
    isCorrectReadingAnswer2: "",
    spIndex1: "",
    riskFree1: "",
    spIndex2: "",
    riskFree2: "",
    spIndex3: "",
    riskFree3: "",
    spIndex4: "",
    riskFree4: "",
    spIndex5: "",
    riskFree5: "",
    spIndex6: "",
    riskFree6: "",
    spIndex7: "",
    riskFree7: "",
    spIndex8: "",
    riskFree8: "",
    spIndex9: "",
    riskFree9: "",
    spIndex10: "",
    riskFree10: "",
    spIndex11: "",
    riskFree11: "",
    spIndex12: "",
    riskFree12: "",
    gender: "",
    age: "",
    stockMarketExperience: "",
    prideAsAmerican: "",
    familiarityWithIndex: "",
    easeOfPronunciationIndex: "",
    followingPerformanceIndex: "",
  });

  const [searchParams] = useSearchParams();
  const countUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.size; // Returns the number of documents in the users collection
  };
  // Function to load user data
  const loadUserData = async () => {
    const userId = searchParams.get("PROLIFIC_PID");
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      setUser({
        ...docSnap.data(),
        _id: docSnap.id,
      });
    } else {
      let count = await countUsers();
      await setDoc(userDocRef, {
        ...user,
        type: count % 2 === 0 ? "Sp500" : "Omx25",
        lan: count % 4 < 2 ? "english" : "spanish",
      });
      setUser({
        ...user,
        type: count % 2 === 0 ? "Sp500" : "Omx25",
        lan: count % 4 < 2 ? "english" : "spanish",

        _id: userId,
      });
      console.log("New user created with default values and _id included.");
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (user._id) {
      const userDocRef = doc(db, "users", user._id);

      const updateUserInDb = async () => {
        await setDoc(userDocRef, user);
        console.log("User data updated in Firestore.");
      };

      updateUserInDb();
    }
  }, [user]); // Ensure to add other dependencies if necessary

  return (
    <LanguageContext.Provider value={{ user, setUser }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw Error("useLanguage must be used within a NameProvider");
  return context;
};
