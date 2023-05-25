import React, { useRef } from 'react'
import  Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { app } from '../Firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router'
function Registration() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()

  const navigate = useNavigate()
  
  function create() {
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const name = nameRef.current.value



    const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("success")
    navigate('/Dashboard')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
  }
  return (
    <div className='Registration-form'>
    <div className='form'>
    <h1>Fiscall</h1>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" ref={nameRef} placeholder="FullName" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" ref= {emailRef} placeholder="Enter email" />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref = {passwordRef} placeholder="Password" />
      </Form.Group>
      <Button variant="primary"  type="submit" onClick = {create}>
        Submit
      </Button>
    </div>
    
    </div>
  )
}

export default Registration