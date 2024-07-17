import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setToken(user.token)
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
    setToken("")
  }

  useEffect( () => {
    async function fetchData() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect( () => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if(userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const LoginForm = () => (
    <div>
      <h2>log in to your application</h2>
      <form onSubmit={handleSubmit}>
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

      <div>
        {/* <form onSumit={handleAddNewBlog}>

        </form> */}
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      { errorMessage && <div>{errorMessage}</div>}
      {
        user === null ?
          LoginForm() :
          BlogForm()
      }
    </div>
  )
}

export default App