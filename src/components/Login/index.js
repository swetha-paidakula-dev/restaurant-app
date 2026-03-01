import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onSuccessfulLogin = jwtToken => {
    const {history} = props
    // Token ni cookie lo 1 day expire time tho save chesthunnam
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const onSubmitLogin = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok) {
      onSuccessfulLogin(data.jwt_token)
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  // Already login ayyi unte direct ga Home page ki pampisthundi
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to='/' />
  }

  return (
    <div className='login-bg-container'>
      <div className='login-card'>
        <form className='login-form' onSubmit={onSubmitLogin}>
          <h1 className='login-heading'>RESTAURANT APP</h1>

          <div className='input-container'>
            <label className='input-label' htmlFor='username'>
              USERNAME
            </label>
            <input
              type='text'
              id='username'
              className='user-input'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Enter Username'
            />
          </div>

          <div className='input-container'>
            <label className='input-label' htmlFor='password'>
              PASSWORD
            </label>
            <input
              type='password'
              id='password'
              className='user-input'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Password'
            />
          </div>

          <button type='submit' className='login-button'>
            Login
          </button>

          {errorMsg && <p className='error-message'>*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
