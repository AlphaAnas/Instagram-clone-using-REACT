import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id, // Unique ID for each post in the database
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram"
        />
      </div>
      <h1>Hello World, Let's build an Insta Clone</h1>

      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.username}
          caption={post.caption}
          imageurl={post.imageurl}
        />
      ))}
    </div>
  );
}

export default App;
