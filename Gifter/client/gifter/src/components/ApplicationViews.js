import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "./Post/PostList";
import PostForm from "./Post/PostForm";
import PostDetails from "./Post/PostDetails";
import UserList from "./User/UserList"
import UserDetails from "./User/UserDetails";
import Login from "./Auth/Login";
import Register from "./Auth/Register"



const ApplicationViews = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}>
      </Route>

      <Route path="/register" element={<Register/>}>
      </Route>
      
      <Route path="/" exact element={<PostList/>}>
        {/* <PostList /> */}
      </Route>

      <Route path="/posts/add" element={<PostForm/>}>
        {/* <PostForm /> */}
      </Route>

     < Route path="/post/edit/:postId/*" element={<PostForm/>}>
     </Route>

      <Route path="/post/:id" element={<PostDetails/>} >
      </Route>
     
      <Route path="/users" element={<UserList/>}>
      </Route>
      


      <Route path="/user/:id" element={<UserDetails/>} >
      </Route>
    </Routes>
  );
};

export default ApplicationViews;