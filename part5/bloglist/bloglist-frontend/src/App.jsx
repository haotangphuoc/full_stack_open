import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogFrom'
import Blog from './components/Blog'
const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  async function fetchBlogs() {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setToken(user.token)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setToken('')
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(title, url)
      fetchBlogs()
      setMessage(`Blog ${title} created by ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } catch {
      setErrorMessage('Blog cant be created')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleAddLike  = (id, blog) => {
    blogService.put(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      author: blog.author.id
    })
    fetchBlogs()
  }

  useEffect( () => {
    fetchBlogs()
  }, [])
  

  useEffect( () => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if(userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      { errorMessage && <div style={{color: "white", background: "red"}}>{errorMessage}</div>}
      { message && <div style={{color: "white", background: "green"}}>{message}</div>}
      {
        user === null ?
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={(newVal) => setUsername(newVal)}
            handlePasswordChange={(newVal) => setPassword(newVal)}
            handleLogin={handleLogin}
          /> 
          : 
          <div>
            <h2>blogs</h2>
            <div>
              {user.name} logged in 
              <button onClick={handleLogout}>log out</button>
            </div>
            <br />
            <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
              <AddBlogForm
                title={title}
                url={url}
                handleTitleChange={(newVal) => setTitle(newVal)}
                handleUrlChange={(newVal) => setUrl(newVal)}
                handleLogout={handleLogout}
                handleAddBlog={handleAddBlog}
                user={user}
                blogs={blogs}
              />
            </Togglable>
            <br />
            <div>
              {blogs.map(blog => 
                <Blog 
                  key={blog.id} blog={blog} 
                  addLike= {() => handleAddLike(blog.id, blog)}
                />)}
            </div>
          </div>
      }
    </div>
  )
}

export default App