import React, { useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserProfileProvider"
// import { UserSearch } from "../User/UserSearch"
import User from "../User/User"

const UserList = () => {
  const { users, getAllUsers } = useContext(UserContext);



  useEffect(() => {
    getAllUsers();
  }, []);



  return (


    <div className="container">

      <div className="row justify-content-center">
        <div className="cards-column">

        {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
          

        {/* //MAP WITHOUT CARD */}
          {/* {users.map((user) => 
          
          {

            return (
              <p>{user.name}</p>
            )
          })}
             */}
          
        </div>
      </div>
    </div>
  );
};

export default UserList;