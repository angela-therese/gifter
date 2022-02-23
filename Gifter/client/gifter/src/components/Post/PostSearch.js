import React, { useContext } from "react"
import { PostContext } from "../../providers/PostProvider"





export const PostSearch = () => {
  const {  searchTerms, setSearchTerms, searchPosts } = useContext(PostContext)
  
  const handleControlledInputChange = (event) => {
      setSearchTerms(event.target.value)
  }

  const handleClickSearchBar = (event) => {
                searchPosts(searchTerms)
            }

  return (
    <>
      Post search:
    <input type="text"
        className="input--wide"
        onKeyUp={handleControlledInputChange}
        placeholder="Search for a Post... " />
    <button onClick={handleClickSearchBar}>Search</button>
    </>
  )
}