import { Box, TextField } from '@mui/material'

const FilterItem = ({name, value, handler, label}) => {

  return (
    <Box className='chk'>
      <TextField 
        type={'checkbox'}
        name= { name }
        value= { value }
        onChange={ handler }
      />
      <label className='chk-label'> { label } </label>
    </Box>
  )
}

export default FilterItem