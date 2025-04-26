import { useEffect, useState } from 'react'
import { Box, Button, TextField} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { fetchApi } from '../../../services'

const MetaKeysComponent = ({ addMoreKey, setAddMoreKey }) => {
  const [productList, setProductList] = useState([])
  const [value, setValue] = useState({title: ''})
  console.log(value, '----', setValue)

  const getBrandList = async () => {
    const response = await fetchApi({ url: 'http://localhost:8080/admin/getProductList?createdBy=1' })
    console.log(response, '----response')
    if (response?.status === 'success') {
      setProductList(response?.data)
    }
  }

  const handleRemove = () => {
    setAddMoreKey([...addMoreKey]) 
  }

  console.log(productList, '===productList')
  useEffect(() => {
    getBrandList()
  }, [])

  return (
    <Box display='flex' className='metaKey' justifyContent='space-between'>
      <Autocomplete
        freeSolo
        fullWidth
        key='1'
        className='meta-key'
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
      <TextField
        variant='filled'
        type='text'
        label='Enter product title'
        onBlur={() => {}}
        onChange={() => {}}
        value={''}
        name='title'
        sx={{marginLeft: '10px' }}
      />
      <Button sx={{ marginLeft: '10px' }} type='button' color='secondary' onClick={handleRemove} 
        variant='contained'> X
      </Button>
    </Box>
  )
}

export default MetaKeysComponent