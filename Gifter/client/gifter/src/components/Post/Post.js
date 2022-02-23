import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


const Post = ({ post }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.userProfile.name}</p>
      <CardImg top src={post.imageUrl} alt={post.title} />
      <CardBody>
        <Link to={`/post/${post.id}`}>
          <strong>{post.title}</strong>
        </Link>
        <p>{post.caption}</p>
        <p>Comments</p>
        {/* {post.comments.map((p) => {
          return <p key={post.id}>{p.message}</p>
        })
        } */}

      </CardBody>
    </Card>
  );
};

export default Post;


