import { useEffect, useState } from 'react'
import { Box, Button, TextField, Select, MenuItem } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header'
import { fetchApi,
  createApi
} from '../../services'

const ProductImg = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [productList, setProductList] = useState([])
  const [files, setFiles] = useState([])
  const [value, setValue] = useState({title: ''})
  console.log(value, '----', setValue)
  const top100Films = [
    { title: '', year: 1994 },
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: 'Schindlers List', year: 1993 },
    { title: 'Pulp Fiction3', year: 1994 },
    { title: 'Schindlers Li5st', year: 1993 },
    { title: 'Pulp Fiction5', year: 1994 },
    { title: 'Schindlers 3List', year: 1993 },
    { title: 'Pulp Ficti3on', year: 1994 },
    { title: 'Schindlers L1ist', year: 1993 },
    { title: 'Pulp Fiction2', year: 1994 },
    { title: 'Schindlers Li2st', year: 1993 },
    { title: 'Pulp Fictio1n', year: 1994 }
  ]
  
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
    // setProductList([{ status: 'loading' }])
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
    <Box m='20px'>
      <Header title='ADD PRODUCT IMG & OTHER META INFO' subtitle='Attach images and other meta info of product' />
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
            <Box
              display='grid'
              flexDirection={'column'}
              gap='10px'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <Box sx={{  display: 'flex', justifyContent: 'space-between' }}>
                <Select
                  labelId='demo-simple-select-label'
                  id='product-auto-select'  
                  defaultValue={values.productId}
                  value={values.productId || '0'}
                  name={'productId'}
                  variant='filled'
                  error={!!touched.productId && !!errors.productId}
                  onChange={handleChange}
                  sx={{ gridColumn: 'span 2' }}
                >
                  <MenuItem value={'0'} >Select Product</MenuItem>
                  { 
                    productList.length && productList.map((data, key) => {
                      return <MenuItem key={key} value={data.product_number}> 
                        {data.product_number}-{data.name} 
                      </MenuItem>
                    })
                  }
                </Select>
              </Box>
              <TextField
                fullWidth
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
              
              <Autocomplete
                options={top100Films}
                getOptionLabel={ (option) => option.title }
                id='disable-close-on-select'
                isOptionEqualToValue={(option, value) => option.title === value.title}
                onChange={(event, newValue) => {
                  setValue(newValue)
                }}
                renderInput={(params) => (
                  <TextField {...params} label='Select Meta key' variant='standard' />
                )}
                sx={{
                  width: '52%',
                  gridColumn: 'span 3'
                }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Save
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

const checkoutSchema = yup.object().shape({
  productId: yup.string().required('required')
})

const initialValues = {
  file: '',
  productId: ''
}

export default ProductImg