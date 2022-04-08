import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        console.log("successfull sign out");
      })
      .catch((error) => {
        setUser({});
        console.error(error);
      });
  };
  return (
    <div className="App">
      <h1>Welcome To React</h1>
      {user.email ? (
        <button onClick={handleGoogleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleGoogleSignIn}>google sign in</button>
      )}
      <h3>{user.displayName}</h3>
      <p>{user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
