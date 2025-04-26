import { useEffect, useState } from 'react'
import { Box, Button, TextField} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import MetaKeysComponent from './MetaKey'
import { fetchApi, createApi } from '../../../services'

const ProductStepTwo = () => {
  const [productList, setProductList] = useState([])
  const [value, setValue] = useState({title: ''})
  const [addMoreKey, setAddMoreKey] = useState([])
  console.log(value, '----', addMoreKey)
  
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData()
       
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

  const getBrandList = async () => {
    const response = await fetchApi({ url: 'http://localhost:8080/admin/getProductList?createdBy=1' })
    console.log(response, '----response')
    if (response?.status === 'success') {
      setProductList(response?.data)
    }
  }

  const addMetaKey = () => {
    const addMore = addMoreKey
    console.log(addMore, '-=-=-=-=')
    addMore.push(1)
    setAddMoreKey([...addMore])
  }

  console.log(productList, '===productList')
  useEffect(() => {
    getBrandList()
  }, [])

  return (
    <Box id='productStepTwo'>
      <form className='addProductImgForm form-transform' encType='multipart/form-data' onSubmit={handleSubmit}>
        <Box display='flex' justifyContent='space-between' mt='20px'>
          <Box gap='10px' display='grid'>
            <Box
              display='flex'
              className='metaKey'
              justifyContent='space-between'
            >
              <Autocomplete
                freeSolo
                fullWidth
                options={productList}
                getOptionLabel={ option => option.title }
                isOptionEqualToValue={(option, value) => option.title === value.title}
                onChange={(_event, newValue) => {
                  setValue(newValue)
                }}
                className='meta-key'
                renderInput={ (params) => <TextField {...params}
                  label='Select Meta key' variant='standard' />}
              />
              <TextField
                variant='filled'
                type='text'
                label='Enter product title'
                // onBlur={() => {''}}
                onChange={() => {}}
                value={''}
                name='title1'
                sx={{marginLeft: '10px'}}
              />
              <Button sx={{marginLeft: '10px' }} type='submit' color='secondary' variant='contained'> X </Button>
            </Box>
            { addMoreKey.length && addMoreKey.map((key) => <MetaKeysComponent key={key} 
              setAddMoreKey={setAddMoreKey}
              addMoreKey={addMoreKey}
            /> ) }
            
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='button' color='secondary' onClick={addMetaKey} variant='contained'>
                ADD NEW KEY
              </Button>
            </Box>
          </Box>
          <Box mt='10px'>
            <Button type='submit' color='secondary' variant='contained'>
              Save & Next
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default ProductStepTwo