import React, { useContext, useState } from "react";
import { PostContext } from "../providers/PostProvider";


const currentTime = new Date();

const PostForm = () => {
  const { addPost } = useContext(PostContext)
  
  // Define the inital state of a new post
  const [post, setPost] = useState(
    {
    
      "title": "",
      "imageUrl": "",
      "caption": "",
      "userProfileId": 4,
      "dateCreated" : currentTime

    }
  )
//   const history = useHistory();
 
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newPost = { ...post}
      /* Post is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newPost[event.target.id] = event.target.value
      // update state
      setPost(newPost)
    }

    // Stop auto refreshing
    const handleClickSavePost = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form
      const newPost = { ...post}
        addPost(newPost)
        // .then(() => history.push("/post"))
      }
    //}
    

    return (
      <form className="postForm">
          <h2 className="postForm__title">New Post</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="title">Post title:</label>
                  <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post title" value={post.title}/>
              </div>
          </fieldset>
          <fieldset>
          <div className="form-group">
                  <label htmlFor="imageUrl">Image Url:</label>
                  <input type="text" id="imageUrl" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Image Url" value={post.imageUrl}/>
              </div>
          </fieldset>
          <fieldset>
          <div className="form-group">
                  <label htmlFor="caption">Post caption:</label>
                  <input type="text" id="caption" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post caption" value={post.caption}/>
              </div>
              
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSavePost}>
            Save Post
          </button>
      </form>
    )
  };
export default PostForm;
