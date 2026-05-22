import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { BottomNav } from "../components/BottomNav";
import { AddDialog } from "../components/AddDialog";

const DataContext = createContext({});

export const DataContextProvider = ({ children }) => {
  const { user } = useAuth();
  const dataCollectionRef = collection(db, "transactions");
  const [data, setData] = useState([]);

  const [nav, setNav] = useState("home");
  const [openAdd, setOpenAdd] = useState(false);

  const handleAddData = (amount, dateTime, title, transactionType) => {
    addDoc(dataCollectionRef, {
      amount: amount,
      dateTime: dateTime,
      title: title,
      transactionType: transactionType,
      uid: user.uid,
    });
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        onSnapshot(collection(db, "transactions"), (snapshot) => {
          const finalData = snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((transaction) => transaction.uid === user?.uid);
          setData(finalData);
        });
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, [user?.uid]);

  const value = { data, handleAddData };
  return (
    <DataContext.Provider value={value}>
      {children}
      <BottomNav nav={nav} setNav={setNav} setOpenAdd={setOpenAdd} />
      <AddDialog open={openAdd} setOpen={setOpenAdd} />
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
