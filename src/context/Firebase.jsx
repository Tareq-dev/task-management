import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import Loading from "./../components/Loading";

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
const firebaseConfig = {
  apiKey: "AIzaSyCIMhiltWftdVBKTDCMat5vzIwttgcihd4",
  authDomain: "task-management-trk.firebaseapp.com",
  projectId: "task-management-trk",
  storageBucket: "task-management-trk.appspot.com",
  messagingSenderId: "591830087023",
  appId: "1:591830087023:web:0d3e9e71ba7d22aad5249a",
  databaseURL: "https://task-management-trk-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getDatabase(app);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userDb, setUserDb] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedData, setEditedData] = useState(null);

  //********Get Task**********/
  useEffect(() => {
    onValue(ref(db, "tasks"), (snapshot) => {
      const data = snapshot.val();
      const arrayOfObjects = Object.values(data);
      setTasks(arrayOfObjects);
    });
  }, []);
  //********Get Users from Db**********/
  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();
      const arrayOfObjects = Object.values(data);
      setUserDb(arrayOfObjects);
    });
  }, []);

  //********Get User**********/
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (loading) return <Loading />;

  //********Create Tasks**********/
  function handleCreateTask(
    taskId,
    dueDate,
    title,
    description,
    status,
    assignedUser,
    email
  ) {
    set(ref(db, "tasks/" + taskId), {
      taskId,
      dueDate,
      title,
      description,
      status,
      assignedUser,
      email,
    });
  }
  //********Create Comments**********/
  async function handleCreateComments(
    comId,
    taskId,
    commentator,
    taskComments
  ) {
    const commentData = {
      comId,
      taskId,
      commentator,
      taskComments,
    };
    const taskCommentsRef = ref(db, `tasks/${taskId}/comments`);
    const newCommentRef = push(taskCommentsRef);
    try {
      await set(newCommentRef, commentData);
    } catch (error) {
      throw error;
    }
  }

  // ****** Edit Data *******/
  const handleEditClick = (task) => {
    setEditedData(task);
    setShowEditForm(true);
  };

  const handleEditFormClose = () => {
    setShowEditForm(false);
  };

  const handleEditFormSubmit = (editedFormData) => {
    console.log("Edited Data:", editedFormData);
    setShowEditForm(false);
  };

  return (
    <FirebaseContext.Provider
      value={{
        showEditForm,
        editedData,
        handleEditFormClose,
        handleEditFormSubmit,
        handleEditClick,
        handleCreateTask,
        handleCreateComments,
        loading,
        tasks,
        user,
        userDb,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
