import React, { useState } from "react";

import { useNavigate } from "react-router-dom";



export const AuthContext = React.createContext();

export const UserAuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getCurrentUser = () => {
    const currentUser = localStorage.getItem("gifterUser");

    return currentUser;
  };


  const navigate = useNavigate();
  
  const login = (userObject) => {
    debugger;
    
    fetch(`api/userprofile/getbyemail?email=${userObject.email}`)
      .then((r) => r.json())
      .then((userObjFromDB) => {
        localStorage.setItem("gifterUser", JSON.stringify(userObjFromDB));
        setIsLoggedIn(true);
        navigate(`/user/${userObjFromDB.id}`);
      })
  };

  const register = (userObject) => {
    fetch("/api/userprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
      .then((response) => response.json())
      .then((userObject) => {
        localStorage.setItem("gifterUser", JSON.stringify(userObject));
      });
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ getCurrentUser, login, register, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
