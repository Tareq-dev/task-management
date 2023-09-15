import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get } from "firebase/database";

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
export const db = getDatabase(app);

//write data
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
export async function handleCreateComments(
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
    console.log("Comment added successfully.");
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

//read comments data

// export async function readCommentData(taskId) {
//   const commentRef = ref(db, `tasks/${taskId}`);

//   try {
//     const snapshot = await get(commentRef);

//     if (snapshot.exists()) {
//       const commentData = snapshot.val();
//       console.log("Comment Data:", commentData);
//       return commentData;
//     } else {
//       console.log("No data available for the specified comment.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error reading comment data:", error);
//     throw error;
//   }
// }
