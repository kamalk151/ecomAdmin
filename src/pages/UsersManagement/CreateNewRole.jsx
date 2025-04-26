import { 
  Box, 
  Button, 
  TextField, 
  Select,
  MenuItem,
  InputLabel } from '@mui/material'
import { 
  Formik
  // Field 
} from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header'
import { useState } from 'react'

const CreateNewRole = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [type, setType] = useState('1')
  
  const handleType = (e) => {
    setType(e.target.value)
  }

  const handleFormSubmit = (values) => {
    values.roleId = type
    const response = fetch('http://localhost:8080/admin/newUser', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
      // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, 
      // same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(values), // body data type must match 'Content-Type' header
    })

    return response.json(); // parses JSON response into native JavaScript objects})
  }

  return (
    <Box m='20px'>
      <Header title='ADD USER' subtitle='Create a new profile for user' />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        isValidating={true}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form className='userForm form-transform' onSubmit={handleSubmit}>
            {/* { console.log(errors, '------', touched)} */}
            <Box
              display='grid'
              gap='10px'
              // gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='First Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name='firstName'
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Last Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name='lastName'
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Contact Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name='phone'
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: 'span 2' }}
              />
              <Box 
                sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between' }}>
                <InputLabel id='user-type-label'>
                  User Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={type}
                  value={type}
                  variant='filled'
                  label='User Types'
                  onChange={handleType}
                  sx={{ width: '60%' }}
                >
                  <MenuItem value={'3'}>Customer</MenuItem>
                  <MenuItem value={'2'}>Manager</MenuItem>
                  <MenuItem value={'1'}>Admin</MenuItem>
                  <MenuItem value={'4'}>Vendor</MenuItem>
                </Select>
              </Box>
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Address 1'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name='address1'
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Address 2'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name='address2'
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: 'span 4' }}
              />
              {/* <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Address 3'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name='address3'
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: 'span 4' }}
              /> */}
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  roleId: yup.string(), 
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  address1: yup.string().required('required'),
  address2: yup.string().required('required'),
})

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
}

export default CreateNewRole