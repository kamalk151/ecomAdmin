import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header'
import FilterItem from './FilterItem'
import { filter } from '../data/mockData'

const ProductFilter = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  
  const handleFormSubmit = (values) => {
    console.log(values)
  }

  return (
    <Box m='20px' >
      <Header title='PRODUCT FILTER' subtitle='Update product filter' />
      <Formik
        onSubmit={ handleFormSubmit }
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          handleChange,
          handleSubmit,
        }) => (
          <form className='filterForm form-transform' onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='10px'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              {/* Checkbox Item */}
              <div className='setting-checkbox' role='group' aria-labelledby='checkbox-group'>
                { 
                  filter.length && filter.map((e, indx) => {
                    return <FilterItem
                      key={indx} 
                      name={ e.name }
                      value={ e.value }
                      onChange={''}
                      label={ e.label }
                      type={ e.type }
                    />
                  })
                }
                <div className='chk' style={{'gridColumn': 'span 4'}}>
                  <TextField 
                    type='checkbox'
                    name='checked' 
                    value='One' 
                    onChange={handleChange}
                  />
                  <span className='chk-label'>
                  Special Product</span>
                </div>
              </div>
              <Box>
                <hr />
                <Box
                  display='grid'
                  gap='10px'
                  gridColumn={'span 4'}
                  mt='10px'
                  width='22%'
                  sx={{
                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 2' },
                  }}
                >
                  <TextField 
                    type='text' 
                    label='Minimum quantity of inventory' 
                    value='' 
                    onChange={''}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField 
                    type='text' 
                    label='Minimum quantity of inventory' 
                    value='' 
                    onChange={''}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    type='text' 
                    label='Minimum quantity of inventory' 
                    value=''
                    onChange={''}
                    sx={{ gridColumn: 'span 2' }}
                  />
                </Box>
              </Box>
            </Box>
            <Box display='flex' justifyContent='center' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Update Changes 
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
  contact: yup
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
  contact: '',
  address1: '',
  address2: '',
}

export default ProductFilter