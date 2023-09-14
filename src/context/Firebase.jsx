import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCIMhiltWftdVBKTDCMat5vzIwttgcihd4",
  authDomain: "task-management-trk.firebaseapp.com",
  projectId: "task-management-trk",
  storageBucket: "task-management-trk.appspot.com",
  messagingSenderId: "591830087023",
  appId: "1:591830087023:web:0d3e9e71ba7d22aad5249a",
  databaseURL: "https://task-management-trk-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export function handleCreateTask(
  taskId,
  dueDate,
  title,
  description,
  status,
  email
) {
  set(ref(db, "tasks/" + taskId), {
    taskId,
    dueDate,
    title,
    description,
    status,
    email,
  });
}

//read data

// import { getDatabase, ref, onValue } from "firebase/database";

// const db = getDatabase();
// const starCountRef = ref(db, "posts/" + postId + "/starCount");
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
