import {React, useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase';

const SignUp= () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange= (e) => {
    setPassword(e.target.value)
  }

  //sign in function
  const handleSubmitButton = (e) => {
    //
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
    //function returns a promise and gets user credentials
    .then((userCredential) => {
      console.log(userCredential)
    }).catch((error) => {
      console.log("User creation failed")
      console.log(error)
    })

  }


  return (
    <div className="signup-body">
      <form onSubmit={handleSubmitButton} className="signup-container">
        <h1 className="signup-header">Create an Account</h1>
        
        <div className="input-field">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={handleEmailChange}
          />
        </div>

        <div className="input-field">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={handlePasswordChange}
          />
        </div>
        
        <div className="signup-button">
          <button type="submit">SignUp</button>
        </div>
      </form>
    </div>
)

}

export default SignUp;