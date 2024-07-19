import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setVisible] = useState(false)

  const handleVisible = () => {
    setVisible(!isVisible)
  }

  const blogDisplay = {
    display: isVisible ? '' : 'none'
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={handleVisible}>{isVisible ? "hide" : "show"}</button></p>
      <div style={blogDisplay}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={addLike}>likes</button></p>
        <p>{blog.author.name}</p>
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>  
  )
}

export default Blog