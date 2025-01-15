import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    index1: 0,
    riskFree1: 0,
    index2: 0,
    riskFree2: 0,
    index3: 0,
    riskFree3: 0,
    index4: 0,
    riskFree4: 0,
    index5: 0,
    riskFree5: 0,
    index6: 0,
    riskFree6: 0,
    index7: 0,
    riskFree7: 0,
    index8: 0,
    riskFree8: 0,
    index9: 0,
    riskFree9: 0,
    index10: 0,
    riskFree10: 0,
    index11: 0,
    riskFree11: 0,
    index12: 0,
    riskFree12: 0,
    gender: "",
    age: "",
    stockMarketExperience: "",
    prideAsAmerican: "",
    familiarityWithIndex: "",
    easeOfPronunciationIndex: "",
    followingPerformanceIndex: "",
  });
  const navigate = useNavigate();

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
    navigate("/?PROLIFIC_PID=" + userId, { replace: true });
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
