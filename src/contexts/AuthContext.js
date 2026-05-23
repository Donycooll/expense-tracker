import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(auth.currentUser);
    });
    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={{ user, signWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
