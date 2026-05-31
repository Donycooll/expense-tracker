import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
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
      createdAt: serverTimestamp(),
    });
  };

  const handleEditData = (id, amount, dateTime, title, transactionType) => {
    const docRef = doc(db, "transactions", id);
    updateDoc(docRef, {
      amount: amount,
      dateTime: dateTime,
      title: title,
      transactionType: transactionType,
    });
  };

  const handleDelete = (id) => {
    const docRef = doc(db, "transactions", id);
    deleteDoc(docRef);
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
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

  const value = { data, handleAddData, openAdd, setOpenAdd, handleEditData, handleDelete };
  return (
    <DataContext.Provider value={value}>
      {children}
      {user && <BottomNav nav={nav} setNav={setNav} setOpenAdd={setOpenAdd} />}
      <AddDialog open={openAdd} setOpen={setOpenAdd} />
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
