import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";



const User = ({ user }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">{user.name}</p>
      {user.posts.map((p) => {
        return (
          // 
          <>
          <CardImg key={p.id} src={p.imageUrl} alt={p.title}/>
          <CardBody>
          <Link to={`/post/${p.id}`}>
          <strong>{p.title}</strong>
        </Link>
          </CardBody>
          
        
        </>
        )
      })}
      
    </Card>
  );
};

export default User;
