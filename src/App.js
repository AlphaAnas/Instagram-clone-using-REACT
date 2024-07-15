import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
// import InstagramEmbed from "react-instagram-embed";
// import { ref, getDownloadURL, listAll } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import ImageUpload from "./ImageUpload"; // Ensure this is a default import

// Modal imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";

// Modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        username: doc.data().username,
        caption: doc.data().caption,
        imageurl: doc.data().imageUrl,
        // post: doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      setUser(userCredential.user);
      handleClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setOpenSignIn(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app">
      {user && user.email ? (
        <ImageUpload username={user.displayName || "No username"} />
      ) : (
        <h3>Sorry, you need to login to upload</h3>
      )}

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram"
        />

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={handleOpen}>Sign Up</Button>
          </div>
        )}

        {/* Sign Up Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form className="app__signup" onSubmit={signUp}>
            <Box sx={style}>
              <div className="app__headerImage2">
                <img
                  src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="instagram"
                />
              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Sign Up
              </Typography>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button id="modal__button" type="submit">
                Sign Up
              </Button>
            </Box>
          </form>
        </Modal>

        {/* Sign In Modal */}
        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form className="app__signup" onSubmit={signIn}>
            <Box sx={style}>
              <div className="app__headerImage2">
                <img
                  src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="instagram"
                />
              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Sign In
              </Typography>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button id="modal__button" type="submit">
                Sign In
              </Button>
            </Box>
          </form>
        </Modal>
      </div>

      <div className="app___posts">
        <div className="app__postsLeft">
          {posts.map((post) => (
            <Post
              key={post.id}
              username={post.username}
              caption={post.caption}
              imageurl={post.imageurl}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <h6>Hello World   </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
