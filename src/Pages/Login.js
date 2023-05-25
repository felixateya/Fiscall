import React, { useRef } from 'react'
import Form  from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/Button'
import {app} from '../Firebase'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router'
function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const navigate = useNavigate()
  function signin() {
    const email = emailRef.current.value
    const password =  passwordRef.current.value


    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("successfull")
    // ...
    navigate('/Dashboard')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
  }
  return (
    <div className='Login-form'>
        <div className='form'>
        <h1>Fiscall</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={passwordRef} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" onClick={signin} type="submit">
        Submit
      </Button>
    </div>
    </div>
  )
}

export default Login