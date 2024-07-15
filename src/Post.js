import React,{useState, useEffect} from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { db } from "./firebase";
import { collection, doc, onSnapshot, Timestamp } from "firebase/firestore";

function Post({ postId, user, username, caption, imageurl}) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const postComment = (e) => {
    e.preventDefault();
    // add comment to the database

    collection(db, "posts", postId, "comments").add({
      comment: comment,
      username: user.displayName,
      timestamp : Timestamp.now(),
    });
    setComment("");
  }
  useEffect(() => {
    let unsubscribe;

    if (postId) {
      const postRef = doc(db, "posts", postId);
      const commentsRef = collection(postRef, "comments");
      
      unsubscribe = onSnapshot(commentsRef, (snapshot) => {
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
      {/* /header = avatar + {username} */}
      <img className="post__image" src={imageurl} alt="main post image" />
      {/* image */}
      <h4 className="post__text">
        {" "}
        <strong>{username} </strong> {caption}
      </h4>
      {/* username + caption  */}
      <div className="post__comments">
          {comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong> {comment.comment}
            </p>
          ))}
      </div>
      <form className="post__commentBox" action="">
        <input className = "post__input" type="text"
          placeholder="add a comment..."
          value = {comment}
          onChange={(e) => setComment(e.target.value)}
           />
        <button className = "post__button" disabled={!comment} type="submit" onSubmit={postComment}>Post</button>
      </form>
      
    </div>
  );
}

export default Post;
