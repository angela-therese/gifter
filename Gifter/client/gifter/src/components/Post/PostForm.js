import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
// import PostList from "./PostList";
import { useNavigate, useParams } from "react-router-dom";



const currentTime = new Date();

const PostForm = () => {
  const { getPost, addPost, updatePost, getAllPosts } = useContext(PostContext)

  //for edit hold onto state of post in this view
  const [post, setPost] = useState({
    title: "",
    imageUrl: "",
    caption: "",
    userProfileId: null,
    dateCreated: ""
  });
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  


  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    const newPost = { ...post }
    newPost[event.target.id] = event.target.value
    // update state
    setPost(newPost)
  }

  console.log('help')

  const navigate = useNavigate();
  const handleClickSavePost = () => {
    
    //disable the button - no extra clicks
    setIsLoading(true);
    if (postId) {
      
      //PUT - update
      updatePost({
        id: post.id,
        title: post.title,
        imageUrl: post.imageUrl,
        caption: post.caption,
        userProfileId: post.userProfileId,
        dateCreated: currentTime
      })
      .then(setPost ({}))
      .then(getAllPosts)
        .then(() => navigate(`/post/${post.id}`))

    }
    else {
      //POST - add
      addPost({
        title: post.title,
        imageUrl: post.imageUrl,
        caption: post.caption,
        userProfileId: post.userProfileId,
        dateCreated: currentTime
      })
        .then(setPost ({}))
        .then(getAllPosts)
        .then(() => navigate("/"))
    }
  }

  //get posts and if there is a postId in the URL, getPost

  useEffect(() => {
    getAllPosts().then(() => {
      if (postId) {
        getPost(postId)
          .then(post => {
            setPost(post)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })
  }, [])



  return (
    <div>
      <form className="postForm">
        <h2 className="postForm__title">{postId ? <>Edit Post</> : <>New Post</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Post title:</label>
            <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post title" value={post.title || ""} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="imageUrl">Image Url:</label>
            <input type="text" id="imageUrl" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Image Url" value={post.imageUrl || ""} />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="caption">Post caption:</label>
            <input type="text" id="caption" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post caption" value={post.caption || ""} />
          </div>
        </fieldset>
        <button className="btn btn-primary"
          onClick={handleClickSavePost}>
          Save Post
        </button>
      </form>
      {/* <PostList /> */}
    </div>
  )


}




















export default PostForm;
