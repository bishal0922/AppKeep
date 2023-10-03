import React from 'react'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut} from 'firebase/auth'
import { auth } from '../../firebase'

const Auth = () => {
    const [authUser, setAuthUser] = useState(null)
    
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
                console.log(user)
            } else {
                setAuthUser(null)
            }
        })

    }, [])

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("User signed out")
        }).catch((error) => {
            console.log("Sign out failed")
            console.log(error)
        })
    }

  return (
    <div>{
        authUser ? <><h1>{`Signed In as ${authUser.email}`}</h1><button onClick={handleSignOut}>Sign Out</button></>: <h1>Logged Out</h1>

    }</div>
  )
}

export default Auth