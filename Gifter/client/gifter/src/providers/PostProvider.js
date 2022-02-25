import React, { useState } from "react";



export const PostContext = React.createContext();


export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [searchTerms, setSearchTerms] = useState("")

  const getAllPosts = () => {
    return fetch("/api/post/GetWithComments")
      .then((res) => res.json())
      .then(setPosts);
  };

  const addPost = (post) => {
    return fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  const searchPosts = (searchTerms) => {
    return fetch(`/api/post/search?q=${searchTerms}&sortDesc=true`)
      .then((res) => res.json())
      .then(setPosts);
  }

  const getPost = (id) => {
    return fetch(`/api/post/${id}`).then((res) => res.json());
  };

  const updatePost = (post) => {
    return fetch(`/api/post/${post.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
.then(getAllPosts)
};

const deletePost = id => {
  return fetch(`/api/Post/${id}`, {
      method: "DELETE"
  })
      .then(getAllPosts)
      
}

return (
  <PostContext.Provider value={{ posts, getAllPosts, getPost, addPost, searchPosts, updatePost, searchTerms, deletePost, setSearchTerms }}>
    {props.children}
  </PostContext.Provider>
);
};