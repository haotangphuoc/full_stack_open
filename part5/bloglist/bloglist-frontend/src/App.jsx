import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  useEffect( () => {
    fetchBlogs()
  }, [])

  useEffect( () => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if(userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      setToken(user.token)
      blogService.setToken(user.token)
    }
  }, [])

  const LoginForm = () => (
    <div>
      <h2>log in to your application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="username" onChange={e => setUsername(e.target.value)}/>
        </div>
        <div>
          password
          <input type="password" password={password} name="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const BlogForm = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in 
        <button onClick={handleLogout}>log out</button>
      </div>
      <br />
      <div>
        <form onSubmit={handleAddBlog}>
          <div>
            title
            <input type='text' value={title} name="title" onChange={e => setTitle(e.target.value)}/>
          </div>
          <div>
            url
            <input type='text' value={url} name="url" onChange={e => setUrl(e.target.value)}/>
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
      <br />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      { errorMessage && <div style={{color: "white", background: "red"}}>{errorMessage}</div>}
      { message && <div style={{color: "white", background: "green"}}>{message}</div>}
      {
        user === null ?
          LoginForm() :
          BlogForm()
      }
    </div>
  )
}

export default App