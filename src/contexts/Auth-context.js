import { auth, db } from "firebase-app/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const colRef = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        onSnapshot(colRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfo({
              ...user,
              ...doc.data(),
            });
          });
        });
      } else {
        setUserInfo(null);
      }
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be within AuthProvider");
  }
  return context;
}
export { useAuth, AuthProvider };
