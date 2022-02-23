import React from "react";
import { Card, CardBody } from "reactstrap";



const User = ({ user }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">{user.name}</p>
      
    </Card>
  );
};

export default User;
