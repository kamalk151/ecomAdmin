import { 
  Box, 
  Button,
  TextField,
  Select,
  MenuItem
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useGetBrandList } from '../hooks'
import { useEffect, useState } from 'react'
import Notification from '../../Notification'
import OtherColor from '../OtherColors'

const ProductStepOne = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [responseMsg, setResponseMsg] = useState({ message: '', status: '' })
  const [openMsg, setOpenMsg] = useState(false)
  const {brandList, getBrandList} = useGetBrandList()
  const [otherColors, setOtherColors] = useState({ 
    staticColorId4: '#0000ff',
    staticColorId1: '#838388',
    staticColorId3: '#ffc0cb',
    staticColorId2: '#060101'
  })
  console.log(otherColors, 'products----------------')
  const handleFormSubmit = async (values, {resetForm, setSubmitting}) => {
    try {
      setResponseMsg({ message: '', status: '' })
      const response = await fetch('http://localhost:8080/admin/newProduct', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: { // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, 
        // same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ ...values, createdBy: 1, colors: otherColors })
      })
      const result = await response.json()
      setOpenMsg(true)
      if(response.ok) {
        setResponseMsg({ message: result.message, status: result.status })
        resetForm({})
      } else {
        setResponseMsg({ 
          message: `${result.message} Please add new product name.`,
          status: 'error'
        })
      }
    } catch (error) {
      setOpenMsg(true)
      setResponseMsg({ 
        message: `${error}`,
        status: 'error' 
      })
      setSubmitting(false)
    }
  }

  useEffect(() => {
    getBrandList()
  }, [(responseMsg.status === 'success')])
  
  const sx = {
    gridColumn: 'span 4',
    '& .css-kuoxtw-MuiInputBase-root-MuiFilledInput-root': {
      padding: '12px 12px 8px'
    }
  }

  return (
    <Box m='0px' id='productStepOne'>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formSchema}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <form className='addProductForm form-transform'
            onSubmit={handleSubmit}
            loading={isSubmitting}
          >
            <Box display='flex' justifyContent='space-between' mt='20px'>
              { 
                openMsg && <Notification
                  open={openMsg}
                  onClose={setOpenMsg}
                  autoHideDuration={6000}
                  message={responseMsg.message}
                  severity={responseMsg.status}
                  action={''}
                />
              }
              <Box
                display='grid'
                gap='10px'
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                }}
              >
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='Enter product title'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name='title'
                  error={!!touched.title && !!errors.title}
                  // helperText={touched.title && errors.title}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='Enter product name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.productName}
                  name='productName'
                  error={!!touched.productName && !!errors.productName}
                  // helperText={touched.productName && errors.productName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <Box
                  sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between' }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={''}
                    value={values.brand}
                    name={'brand'}
                    variant='filled'
                    error={!!touched.brand && !!errors.brand}
                    onChange={handleChange}
                    sx={{ width: '60%' }}
                  >
                    <MenuItem value={'1'}>Select Brand</MenuItem>
                    { brandList?.total && brandList?.data.map((val, key) => {
                      return <MenuItem
                        key={key}
                        value={val.brand_id}>
                        {val.brand_name}
                      </MenuItem>
                    }) }
                  </Select>
                </Box>
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='Enter Mrp.'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mrp}
                  name='mrp'
                  error={!!touched.mrp && !!errors.mrp}
                  helperText={touched.mrp && errors.mrp}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='Enter sell price'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sellPrice}
                  name='sellPrice'
                  error={!!touched.sellPrice && !!errors.sellPrice}
                  helperText={touched.sellPrice && errors.sellPrice}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  fullWidth
                  variant='filled'
                  type='text'
                  label='Enter discount'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discount}
                  name='discount'
                  error={!!touched.discount && !!errors.discount}
                  helperText={touched.discount && errors.discount}
                  sx={{ gridColumn: 'span 2' }}
                />
                <OtherColor
                  otherColors={ otherColors }
                  setOtherColors={ setOtherColors }
                />
                <TextField
                  multiline
                  rows={4}
                  variant='filled'
                  type='textarea'
                  label='Enter description'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name='description'
                  error={!!touched.description && !!errors.description}
                  // helperText={touched.description && errors.description}
                  sx={sx}
                />
              </Box>
              <Box mt='10px'>
                <Button type='submit' color='secondary' variant='contained'>
                  Save & Next
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const formSchema = yup.object().shape({
  productName: yup.string().required('required'),
  brand: yup.string().required('required'),
  mrp: yup.number().required('required'),
  title: yup.string().required('required'),
  description: yup.string().required('required'),
  discount: yup
    .number()
    .required('required'),
  sellPrice: yup.number().required('required')
})

const initialValues = {
  productName: '',
  brand: '1',
  mrp: '',
  description: '',
  title: '',
  discount: '',
  sellPrice: ''
}

export default ProductStepOne