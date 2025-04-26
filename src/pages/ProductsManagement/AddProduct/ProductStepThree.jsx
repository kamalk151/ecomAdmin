import { useEffect, useState } from 'react'
import { Box, Button, TextField} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { Formik } from 'formik'
import * as yup from 'yup'
import { fetchApi, createApi } from '../../../services'

const ProductStepThree = () => {
  const [productList, setProductList] = useState([])
  const [files, setFiles] = useState([])
  const [value, setValue] = useState({title: ''})
  console.log(value, '----', setValue)
  
  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('images', file)
      })
      formData.append('productId', values.productId)
      formData.append('createdBy', 1)
      const postData = await createApi({
        url: 'http://localhost:8080/admin/productImg',
        data: formData
      })
      console.log(postData, '----response')
    } catch (err) {
      console.log(err, '---drer')
    }
    
  }

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const getBrandList = async () => {
    const response = await fetchApi({ url: 'http://localhost:8080/admin/getProductList?createdBy=1' })
    console.log(response, '----response')
    if (response?.status === 'success') {
      setProductList(response?.data)
    }
  }
  console.log(productList, '===productList')
  useEffect(() => {
    getBrandList()
  }, [])

  return (
    <Box m='0px' id='productStepThree'>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <form className='addProductImgForm form-transform' encType='multipart/form-data' onSubmit={handleSubmit}>
            <Box display='flex' justifyContent='space-between' mt='20px'>
              <Box gap='10px' display='grid'>
                <Box id='product-auto-select'  
                  sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Autocomplete
                    options={productList}
                    getOptionLabel={ (option) => option.title }
                
                    isOptionEqualToValue={(option, value) => option.title === value.title}
                    onChange={(event, newValue) => {
                      setValue(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label='Select Meta key' variant='standard' />
                    )}
                  />
                </Box>
                <Box
                  display='grid'
                  gap='10px'
                  maxWidth='500px'
                >
                  <TextField fullWidth
                    inputProps={{
                      multiple: true
                    }}
                    variant='filled'
                    type='file'
                    label=''
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e)
                      handleFileChange(e)
                    }}
                    value={values.file}
                    name='file'
                    error={!!touched.file && !!errors.file}
                    helperText={touched.file && errors.file}
                    sx={{ gridColumn: 'span 2' }}
                  />
                </Box>
              </Box>
              <Box mt='10px'>
                <Button type='submit' color='secondary' variant='contained'>
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const checkoutSchema = yup.object().shape({
  productId: yup.string().required('required')
})

const initialValues = {
  file: '',
  productId: ''
}

export default ProductStepThree