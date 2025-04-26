import { Box, Checkbox, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useState, useEffect } from 'react'
import { fetchApi } from '../../services'

const Products = () => {
  const theme = useTheme()
  const [productList, setProductList] = useState()
  const colors = tokens(theme.palette.mode)
  const columns = [
    { field: 'product_number', headerName: 'Product Number' },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      cellClassName: 'productName-column--cell',
    },
    {
      field: 'brand_id',
      headerName: 'Brand',
      flex: 1,
      cellClassName: 'Brand-column--cell',
    },
    {
      field: 'mrp',
      headerName: 'MRP.',
      flex: 1,
    },
    {
      field: 'discount',
      headerName: 'Discount',
      flex: 1,
    },
    {
      field: 'amount',
      headerName: 'Sell Price',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width='60%'
            m='0 auto' 
            display='flex'
            justifyContent='center'
            borderRadius='4px'
          >
            <Checkbox 
              type="checkbox"
              defaultChecked={ status === 'Active' ? true : false }
              name= { 'name' }
              value= { 'value' }
              onChange={ 'handler' }
              title={ status === 'Active' ? 'Active': 'In-Active'}
            />
          </Box>
        )
      }
    }
  ]
  const sx = {
    '& .MuiDataGrid-root': {
      border: '5px solid red'
    },
    '& .MuiDataGrid-cell': {
      borderBottom: 'none'
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colors.blueAccent[700],
      borderBottom: 'none',
      minHeight: '40px!important',
      height: '40px!important'
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
      borderBottom: 'none !important'
    },
    '& .MuiCheckbox-root': {
      color: `${colors.greenAccent[200]} !important`,
    },
    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
      color: `${colors.grey[100]} !important`,
    }
  }

  const getProduct = async () => {
    try {
      setProductList([{status: 'loading'}])
      const response = await fetchApi({ url: 'http://localhost:8080/admin/getProductList?createdBy=1' })
      setProductList(response)
    }
    catch(e) {
      console.log(e,' ==e')
      setProductList([{status: 'error'}])
    }
  }

  useEffect(() => {
    getProduct()
    console.log(productList,'===productList')
  }, [])

  return (
    <Box m='10px'>
      <Header m='0 0 5px 0' title='Products' subtitle='Managing the Products' />
      <Box
        height='95vh'
      >
        <DataGrid sx={sx}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          rows={
            productList?.status === 'success'
              ? productList.data
              : []
          } 
          columns={columns}
          getRowId={(row) => row.product_id}
        />
      </Box>
    </Box>
  )
}

export default Products
