import React, { useEffect, useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import Post from "./Post";

const PostDetails = () => {
  const [post, setPost] = useState();
  const { getPost } = useContext(PostContext);
  const { id } = useParams();
  const [count, setCount] = useState(0)

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }

  
  
  function countLikes(){
    
      setCount(count + 1)
    
  }
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <Post post={post} />
          <button onClick={countLikes}>Like</button>
          <p id="counter-label">{count} likes</p>
          {/* <ListGroup>
            {post.comments?.map((c) => (
              <ListGroupItem>{c.message}</ListGroupItem>
            ))}
          </ListGroup> */}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;