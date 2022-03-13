import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";





const handleClickSubscribe = () => {
   
}



const User = ({ user }) => {
  return (
    <>
    <h1>{user.name}'s Profile</h1>
    <Card className="m-4">
      <div>
      <p className="text-left px-2">{user.name}</p>
        <button onClick={handleClickSubscribe}>Subscribe</button>
      </div>
      
      
      {user.posts?.map((p) => {
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
    </>
  );
};

export default User;
