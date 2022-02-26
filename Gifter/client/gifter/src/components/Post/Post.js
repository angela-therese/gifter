import React, { useContext } from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";






const Post = ({ post }) => {
  const navigate = useNavigate();

  const { deletePost} =useContext(PostContext)
  
  const handlePostDelete = () => {
    deletePost(post.id)
        .then(() => {
           navigate('/')
        })
  
  }

  if(post.userProfile.id === 4)
  {
  return (
    <Card className="m-4">
       <Link to={`/user/${post.userProfile.id}`}><p className="text-left px-2">Posted by: {post.userProfile.name}</p></Link>
      <CardImg top src={post.imageUrl} alt={post.title} />
      <CardBody>
        <Link to={`/post/${post.id}`}>
          <strong>{post.title}</strong>
        </Link>
        <p>{post.caption}</p>
       <section>
        <button onClick={() => {
          navigate(`/post/edit/${post.id}`)
        }}>Edit</button>
       
        <button onClick={handlePostDelete}>Delete</button>
       
       </section>
       
        <p>Comments</p>
        {/* {post.comments.map((p) => {
          return <p key={post.id}>{p.message}</p>
        })
        } */}
      </CardBody>
    </Card>
  )
  }
  else
  {
    return (
    <Card className="m-4">
       <Link to={`/user/${post.userProfile.id}`}><p className="text-left px-2">Posted by: {post.userProfile.name}</p></Link>
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
  );} 
  
};

export default Post;


