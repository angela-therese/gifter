import React, { useState } from "react";


export const UserContext = React.createContext();


export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
 

  const getAllUsers = () => {
    return fetch("/api/UserProfile")
      .then((res) => res.json())
      .then(setUsers);
  };


const getUser = (id) => {
  return fetch(`/api/UserProfile/GetByIdWithPosts?id=${id}`).then((res) => res.json());
};

// const getUserById = (id) => {
//   return fetch(`/api/UserProfile/GetByIdWithPosts?id=${id}`)
// }



  return (
    <UserContext.Provider value={{ users, getAllUsers, getUser}}>
      {props.children}
    </UserContext.Provider>
  );
};