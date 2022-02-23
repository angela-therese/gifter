import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useParams } from "react-router-dom";
import User from "./User"

const UserDetails = () => {
  const [user, setUser] = useState();
  const { getUser } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getUser(id).then(setUser);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <User user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;