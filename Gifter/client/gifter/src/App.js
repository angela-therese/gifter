import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from "./providers/PostProvider";
import { UserProvider } from "./providers/UserProfileProvider";
import {UserAuthProvider} from "./providers/AuthProvider"

function App() {
  return (
    <div className="App">
      <Router>
      <UserProvider>
        <UserAuthProvider>
        <PostProvider>
          <ApplicationViews />
        </PostProvider>
        </UserAuthProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;