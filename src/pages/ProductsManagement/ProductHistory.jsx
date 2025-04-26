
import { Box, Button, TextField, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import { mockDataProductHistory } from '../../data/mockData'
import Header from '../../components/Header'

const ProductsHistory = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const columns = [
    {
      field: 'productNumber',
      headerName: 'Product Number',
      flex: 1,
      cellClassName: 'product-column--cell',
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1
    },
    {
      field: 'updatedDate',
      headerName: 'Updated Date',
      flex: 1,
    },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    }
  ]

  const sx = {
    '& .MuiDataGrid-root': {
      border: '1px solid red'
    },
    '& .MuiDataGrid-cell': {
      borderBottom: 'none'
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colors.blueAccent[700],
      borderBottom: 'none',
      minHeight: '40px!important',
      height: '40px!important',
    },
    '& .MuiDataGrid-virtualScroller': {
      backgroundColor: colors.primary[400],
      marginTop: '41px!important'
    },
    '& .MuiDataGrid-virtualScroller .MuiDataGrid-row': {
      backgroundColor: colors.primary[400],
      minHeight: '40px!important',
      height: '40px!important',
      lineHeight: '40px!important'
    },'& .MuiDataGrid-virtualScroller .MuiDataGrid-row .MuiDataGrid-cell': {
      backgroundColor: colors.primary[400],
      minHeight: '40px!important',
      height: '40px!important',
      lineHeight: '40px!important'
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: 'none',
      display: 'none',
      backgroundColor: colors.blueAccent[700],
    },
    '& .MuiDataGrid-row': {
      borderBottom: 'none !important',
    },
    '& .MuiCheckbox-root': {
      color: `${colors.greenAccent[200]} !important`,
    },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
      color: `${colors.grey[100]} !important`,
    }
  }

  return (
    <Box m='10px'>
      <Header m='0 0 5px 0' title='Product History' subtitle='Search Product history' />
      <Box 
        component='form'
        className='searchText'
        display={'flex'}
      >
        <TextField 
          mb='10px'
          id='searchField'
          className='searchField'
          defaultValue={ '1231' }
          label='Enter Product Number'
          variant='standard'
        />
        <Box  mt='10px' ml='30px'>
          <Button  type='submit' color='secondary' variant='contained'>
            Search
          </Button>
        </Box>
       
      </Box>
      <Box
        height='95vh'
        mt='20px'
      >
        <DataGrid sx={ sx }
          rows={mockDataProductHistory} 
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default ProductsHistory
