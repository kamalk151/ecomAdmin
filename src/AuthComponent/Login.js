
import { Component } from 'react'
import { AuthContext } from '../AuthContext'
import './auth.css'
import { Box } from '@mui/system'
import { TextField, Button } from '@mui/material'

export default class Login extends Component {
  static contextType = AuthContext
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  
  handleChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value })
  }
  
  handleLoginForm = (e) => {
    e.preventDefault()
    this.context.setContextState({
      isLoggedIn: true,
      isSideBar: true
    })
    this.props.naviagation('/')
  }

  render() {
    return (
      <Box className='auth-body'>
        <h1> ADMIN Login </h1>
        <form className='form' onSubmit={ this.handleLoginForm } >
          <Box
            display='grid'
            gap='10px'
            // gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          >
            <TextField
              fullWidth
              variant='filled'
              type='text'
              label='Username'
              onChange={ this.handleChange }
              id='username'
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              fullWidth
              variant='filled'
              label='Password'
              id='password'
              onChange={ this.handleChange }
              type='password'
              sx={{ gridColumn: 'span 2' }}
            />
            <Button 
              variant='contained'
              type='submit'
              color='primary'
              className='form__custom-button'
            >
              Log in
            </Button>
          </Box>
        </form>
      </Box>
    )
  }
}
