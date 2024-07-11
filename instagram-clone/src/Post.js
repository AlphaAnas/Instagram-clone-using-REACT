import React from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function Post({username, caption, imageurl}) {
  console.log(username);
    console.log(caption);
  console.log("Image URL:", imageurl); // Log the image URL to check if it's correct
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
    </div>
  );
}

export default Post;
