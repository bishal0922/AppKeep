import {React, useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase';
import '../styles/userauth.css';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange= (e) => {
    setPassword(e.target.value)
  }

  const handleSubmitButton = (e) => {
    //
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    //function returns a promise and gets user credentials
    .then((userCredential) => {
      console.log(userCredential)
    }).catch((error) => {
      console.log("User Login failed")
      console.log(error)
    })

  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div>
      <form onSubmit={handleSubmitButton} className="form-body">
        {/* <h1> Login </h1> */}
        {/* <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <button type="submit" >Login</button> */}
        
        <div className='login-container'>

          <p className='auth-type-display'>
            Login
          </p>

          <div className='type-field'>
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
          </div>

          <div className="type-field" style={{ position: 'relative' }}>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={handlePasswordChange}
          />
          <span 
            style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
            onClick={toggleShowPassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
          </div>
        
          <div className='submit-button'>
            <button type="submit" >Login</button>
          </div>
          
        </div>

      </form>
      
    </div>
  )
}

export default Login;