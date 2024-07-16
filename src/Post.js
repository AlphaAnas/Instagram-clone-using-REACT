import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { db } from "./firebase";
import {
  collection,
  doc,
  onSnapshot,
  Timestamp,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";

function Post({ postId, user, username, caption, imageurl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const postComment = async (e) => {
    e.preventDefault();
    console.log("This post comment function worked");

    try {
      await addDoc(collection(doc(db, "posts", postId), "comments"), {
        comment: comment,
        username: user.displayName,
        timestamp: Timestamp.now(),
      });
      console.log("Username is : ", user.displayName);
      setComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      const postRef = doc(db, "posts", postId);
      const commentsRef = collection(postRef, "comments");
      const q = query(commentsRef, orderBy("timestamp", "desc"));

      unsubscribe = onSnapshot(q, (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [postId]);

  return (
    <div className="post">
      <div className="post__header">
        <Stack className="post__avatar" direction="row" spacing={2}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Stack>
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageurl} alt="main post image" />
      <h4 className="post__text">
        <strong>{username} </strong> {caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment, index) => (
          
          <p key={index}>
         
            
            <strong>{comment.username}</strong>: {comment.comment}
       
          </p>
        ))}
      </div>

      {user && (

        <form className="post__commentBox" onSubmit={postComment}>
        <input
          className="post__input"
          type="text"
          placeholder="add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          />
        <button className="post__button" disabled={!comment} type="submit">
          Post
        </button>
      </form>
        )}
    </div>
  );
}

export default Post;
