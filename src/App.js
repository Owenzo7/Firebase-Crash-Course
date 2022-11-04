import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});

  const [loading, setLoading] = React.useState(true);

   async function updatePost () {
    const hardCodedId = "XyXGs0Pi4tTCuxoqy2d2";
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostById(hardCodedId)
    console.log(post)
    const newPost = {

      ...post,
      title: "Land a $400K job"
    }

    console.log(newPost)

    updateDoc(postRef, newPost)

  }



  function deletePost () {

    const hardCodedId = "XyXGs0Pi4tTCuxoqy2d2";
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef)

  }

  function createPosts() {
    const post = {
      title: "Finish Interview section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };

    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));

    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));

    console.log(posts);
  }

  async function getPostById(id) {
    
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return  postSnap.data();
    
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);

    console.log(docs.map(doc => doc.data()))
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);

      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");

    createUserWithEmailAndPassword(auth, "yo@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function login() {
    signInWithEmailAndPassword(auth, "yo@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function logout() {
    signOut(auth);

    setUser({});
  }
  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      {loading ? "loading...." : user.email}

      <button onClick={createPosts}>Create Post</button>
      <button onClick={getAllPosts}>Get all Posts</button>
      <button onClick={getPostById}>Get Post by Id</button>
      <button onClick={getPostByUid}>Get Post by Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
