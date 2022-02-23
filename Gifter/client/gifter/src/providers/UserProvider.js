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
  return fetch(`/api/UserProfile/${id}`).then((res) => res.json());
};



  return (
    <UserContext.Provider value={{ users, getAllUsers, getUser}}>
      {props.children}
    </UserContext.Provider>
  );
};