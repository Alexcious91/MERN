import React, { Component } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import axios from "axios"

class Auth extends Component {
   state = {
      isLogin: true,
      email: '',
      password: ''
   }

   handleSwitch = () => {
      this.setState(prevState => ({
         isLogin: !prevState.isLogin,
         email: '',
         password: ''
      }))
   }

   handleChange = event => {
      this.setState({
         [event.target.name]: event.target.value,
      });
   };

   handleSubmit = async (event) => {
      event.preventDefault()
      const { email, password, isLogin } = this.state

      if (email.trim().length === 0 || password.trim().length === 0) {
         return;
      }

      
      try {
         let result;

         if (!isLogin) {
            result = await axios.post("http://localhost:5000/graphql", {
               query: `
                  mutation {
                     createUser(userInput: { email: "${email}", password: "${password}" }) {
                        _id
                        email
                     }
                  }
               `
            });
         } else {
            result = await axios.post("http://localhost:5000", {
               email,
               password
            })
         }
         console.log(result.data)

         // reset inputs
         this.setState({
            email: '',
            password: ''
         })
      } catch (error) {
         console.log(error.message)
      }
   }

   render() {
      return (
         <Container className='p-5 mt-5'>
            <Form onSubmit={this.handleSubmit}>
               <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type='email'
                     required
                     onChange={this.handleChange}
                     value={this.state.email}
                  />
               </Form.Group>

               <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type='password'
                     required
                     value={this.state.password}
                     onChange={this.handleChange}
                  />
               </Form.Group>

               <Button variant='primary' type='submit' className='w-100 mb-2'>{this.state.isLogin ? "Login" : "Register"}</Button>
               <Button variant='secondary' className='w-100'>Switch to {this.state.isLogin ? "Signup" : "Login"}</Button>
            </Form>
         </Container>
      )
   }
}

export default Auth
