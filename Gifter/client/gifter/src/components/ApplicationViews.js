import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "./Post/PostList";
import PostForm from "./Post/PostForm";
import PostDetails from "./Post/PostDetails";
import UserList from "./User/UserList"
import UserDetails from "./User/UserDetails";



const ApplicationViews = () => {
  return (
    <Routes>
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