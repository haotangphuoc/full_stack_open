import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {
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
          <input type="password" value={password} name="password" onChange={e => handlePasswordChange(e.target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

LoginForm.displayName = 'LoginForm'

export default LoginForm