import {React, useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase';
import './styles/userauth.css';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 

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
            <p>Email</p>
            <input type="email" placeholder="johndoe@email.com" value={email} onChange={handleEmailChange}/>
          </div>

          <div className='type-field'>
            <p>Password</p>
            <input type="password" placeholder="Password123" value={password} onChange={handlePasswordChange}/>
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