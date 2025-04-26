
import { Box, Button, TextField, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import { mockDataOrderHistory } from '../../data/mockData'
import Header from '../../components/Header'

const OrderHistory = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'orderNumber',
      headerName: 'Order Number',
      flex: 1,
      cellClassName: 'order-column--cell',
    },
    {
      field: 'prodcutId',
      headerName: 'Product IDs',
      flex: 1,
      renderCell: ({ row: { productId } }) => {
        return ( productId.join(', ') )
      }
    },
    {
      field: 'updatedDate',
      headerName: 'Updated Date',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    },
  ]

  const sx = {
    '& .MuiDataGrid-root': {
      border: '1px solid red',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: 'none',
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
      <Header m='0 0 5px 0' title='Order History' subtitle='Search Order history' />
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
          label='Enter Order Number'
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
          checkboxSelection 
          rows={mockDataOrderHistory} 
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default OrderHistory
