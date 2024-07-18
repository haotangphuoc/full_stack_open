import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible(!isVisible)
  }

  const blogDisplay = {
    display: isVisible ? '' : 'none'
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={handleClick}>{isVisible ? "hide" : "show"}</button></p>
      <div style={blogDisplay}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>likes</button></p>
        <p>{blog.author.name}</p>
      </div>
    </div>  
  )
}

export default Blog