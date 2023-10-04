import {React, useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase';
import {useNavigate} from 'react-router-dom'

const SignUp= () => {
  const navigate= useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange= (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //sign in function
  const handleSubmitButton = (e) => {
    //
    e.preventDefault()

    if(password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if(password.length < 8) {
      setError('Password must be at least 8 characters!');
      return;
    }


    createUserWithEmailAndPassword(auth, email, password)
    //function returns a promise and gets user credentials
    .then((userCredential) => {
      console.log(userCredential)

      //load their data


      //redirect to homepage
      navigate("/")


    }).catch((error) => {
      console.log("User creation failed")
      console.log(error)
      setError(error.message)
    })

  }


  return (
    <div className="signup-body">
      <form onSubmit={handleSubmitButton} className="signup-container">
        <h1 className="signup-header">Create an Account</h1>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <div className="input-field">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={handleEmailChange}
          />
        </div>

        <div className="input-field" style={{ position: 'relative' }}>
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


        <div className='input-field' style={{ position: 'relative' }}>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange}
          />
          <span 
            style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
            onClick={toggleShowPassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        
        <div className="signup-button">
          <button type="submit">SignUp</button>
        </div>
      </form>
    </div>
)

}

export default SignUp;