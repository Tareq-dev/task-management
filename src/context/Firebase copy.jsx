import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithPopup,
  // onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  // getDoc,
  // doc,
  // query,
  // where,
} from "firebase/firestore";

import { getStorage, ref } from "firebase/storage";
// import { getDatabase, ref } from "firebase/storage";
import toast from "react-hot-toast";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCIMhiltWftdVBKTDCMat5vzIwttgcihd4",
  authDomain: "task-management-trk.firebaseapp.com",
  projectId: "task-management-trk",
  storageBucket: "task-management-trk.appspot.com",
  messagingSenderId: "591830087023",
  appId: "1:591830087023:web:0d3e9e71ba7d22aad5249a",
  // databaseURL: "https://task-management-trk-default-rtdb.firebaseio.com",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
// const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);

// const googleProvider = new GoogleAuthProvider();
// onValue();
export const FirebaseProvider = (props) => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   onAuthStateChanged(firebaseAuth, (user) => {
  //     if (user) setUser(user);
  //     else setUser(null);
  //   });
  // }, []);

  // const signupUserWithEmailAndPassword = (email, password) =>
  //   createUserWithEmailAndPassword(firebaseAuth, email, password);

  // const singinUserWithEmailAndPass = (email, password) =>
  //   signInWithEmailAndPassword(firebaseAuth, email, password);

  // const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  // const handleCreateNewListing = async (name, isbn, price, cover) => {
  //   const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
  //   const uploadResult = await uploadBytes(imageRef, cover);
  //   return await addDoc(collection(firestore, "books"), {
  //     name,
  //     isbn,
  //     price,
  //     imageURL: uploadResult.ref.fullPath,
  //     userID: user.uid,
  //     userEmail: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //   });
  // };

  const listAllTasks = () => {
    return getDocs(collection(firestore, "tasks"));
  };

  // const getBookById = async (id) => {
  //   const docRef = doc(firestore, "books", id);
  //   const result = await getDoc(docRef);
  //   return result;
  // };

  // const getImageURL = (path) => {
  //   return getDownloadURL(ref(storage, path));
  // };

  // const placeOrder = async (bookId, qty) => {
  //   const collectionRef = collection(firestore, "books", bookId, "orders");
  //   const result = await addDoc(collectionRef, {
  //     userID: user.uid,
  //     userEmail: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     qty: Number(qty),
  //   });
  //   return result;
  // };

  // const fetchMyBooks = async (userId) => {
  //   const collectionRef = collection(firestore, "books");
  //   const q = query(collectionRef, where("userID", "==", userId));

  //   const result = await getDocs(q);
  //   return result;
  // };

  // const getOrders = async (bookId) => {
  //   const collectionRef = collection(firestore, "books", bookId, "orders");
  //   const result = await getDocs(collectionRef);
  //   return result;
  // };

  // const isLoggedIn = user ? true : false;
  const handleCreateTask = async (
    userId,
    dueDate,
    title,
    description,
    status,
    email
  ) => {
    const res = await addDoc(collection(firestore, "tasks"), {
      userId,
      dueDate,
      title,
      description,
      status,
      email,
    });
    if (res?.id) {
      toast.success("Successfully toasted!");
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        handleCreateTask,
        listAllTasks,
        // signinWithGoogle,
        // signupUserWithEmailAndPassword,
        // singinUserWithEmailAndPass,
        // handleCreateNewListing,
        // listAllBooks,
        // getImageURL,
        // getBookById,
        // placeOrder,
        // fetchMyBooks,
        // getOrders,
        // isLoggedIn,
        // user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
