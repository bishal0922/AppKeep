import {React, useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase';

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
      <form onSubmit={handleSubmitButton}>
        <h1> Login </h1>
        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <button type="submit" >Login</button>
      </form>
      
    </div>
  )
}

export default Login;