
const LoginForm = ({username, password, handleUsernameChange, handlePasswordChange, handleLogin}) => {
  return (
    <div>
      <h2>log in to your application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="username" onChange={e => handleUsernameChange(e.target.value)}/>
        </div>
        <div>
          password
          <input type="password" password={password} name="password" onChange={e => handlePasswordChange(e.target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm