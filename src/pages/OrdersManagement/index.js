
import { useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { fetchApi } from '../../services'

const Orders = () => {
  const [orderList, setOrderList] = useState([])
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  
  const renderAmount = (amount) => {
    const amt = parseFloat(amount)
    return !isNaN(amt) && (Math.floor(amt * 100)/100).toFixed(2)
  }

  const columns = [
    { 
      field: 'order_id',
      headerName: 'ID',
      renderCell: ({row}) => row.order_id
    },
    {
      field: 'order_number',
      headerName: 'Order Number',
      flex: 1,
    },
    {
      field: 'product_name',
      headerName: 'Product Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'qty',
      headerName: 'Quantity',
      flex: 1,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      renderCell: ({row}) => {
        return renderAmount(row.amount)
      }
    },
    {
      field: 'total_amount',
      headerName: 'Total Amount',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      flex: 1,
    },
    {
      field: 'other',
      headerName: 'Other Info',
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width='60%'
            m='0 auto' 
            display='flex'
            justifyContent='center'
            backgroundColor={
              access === 'admin'
                ? colors.greenAccent[600]
                : access === 'manager'
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius='4px'
          >
            <Typography color={colors.primary[100]} sx={{ ml: '5px', cursor: 'pointer' }}>
              Details 
            </Typography>
          </Box>
        )
      },
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
  
  const fetchOrder = async () => {
    try {
      setOrderList([{status: 'loading'}])
      const response = await fetchApi({ url: 'http://localhost:8080/admin/getOrderList?createdBy=1' })
      setOrderList(response)
    }
    catch(e) {
      console.log(e,' ==e')
      setOrderList([{status: 'error'}])
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <Box m='10px'>
      <Header m='0 0 5px 0' title='Orders List' subtitle='Managing the Orders' />
      <Box
        height='95vh'
      >
        <DataGrid 
          sx={ sx }
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          rows={
            orderList?.status === 'success'
              ? orderList.data
              : []
          }
          columns={columns}
          getRowId={(row) => row.order_id}
        />
      </Box>
    </Box>
  )
}

export default Orders
