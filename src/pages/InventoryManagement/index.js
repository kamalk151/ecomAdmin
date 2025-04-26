import { useState, useEffect } from 'react'
import { 
  Box,
  Typography, 
  useTheme
} from '@mui/material'
import { fetchApi } from '../../services'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import Header from '../../components/Header'

const Inventory = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [invetoryList, setInvetoryList] = useState([])
  const columns = [
    {
      field: 'product_name',
      headerName: 'Product Name',
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'product_number',
      headerName: 'Product Number',
      type: 'number',
      headerAlign: 'left',
      align: 'left'
    },
    {
      field: 'min_quantity',
      headerName: 'Min Quantity',
      flex: 1,
      renderCell: ({ row: { min_quantity: minQnt } }) => {
        return (
          <Box
            width='60%'
            m='0 auto' 
            display='flex'
            justifyContent='center'
            backgroundColor={
              colors.redAccent[200] 
            }
            borderRadius='4px'
          >
            <Typography color={colors.primary[800]} sx={{ ml: '5px' }}>
              { minQnt }
            </Typography>
          </Box>
        )
      }
    },
    {
      field: 'total_quantity',
      headerName: 'Total Quantity',
      flex: 1,
      renderCell: ({ row: { total_quantity: totalQnt } }) => {
        return (
          <Box
            width='60%'
            m='0 auto' 
            display='flex'
            justifyContent='center'
            backgroundColor={
              colors.yelloAccent[700] 
            }
            borderRadius='4px'
          >
            <Typography color={colors.primary[800]} sx={{ ml: '5px' }}>
              { totalQnt }
            </Typography>
          </Box>
        )
      }
    },
    {
      field: 'remaining_qnt',
      headerName: 'Remaining Quantity',
      flex: 1,
      renderCell: ({ row: { min_quantity : minQuantity, remaining_qnt: remainQnt} }) => {
        return (
          <Box
            width='60%'
            m='0 auto' 
            display='flex'
            justifyContent='center'
            backgroundColor={
              remainQnt <= minQuantity
                ? colors.redAccent[600] 
                : colors.greenAccent[700]  
            }
            borderRadius='4px'
          >
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              { remainQnt }
            </Typography>
          </Box>
        )
      }
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1
    },
    {
      field: 'total_amount',
      headerName: 'Total Amount',
      flex: 1
    },
    {
      field: 'created_by',
      headerName: 'Inventory Owner',
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1
    }
  ]

  const getInventoryList = async () => {
    try {
      setInvetoryList([{ status: 'loading' }])
      const response = await fetchApi({ url: 'http://localhost:8080/admin/getInventoryList?createdBy=1' })
      setInvetoryList(response)
    }
    catch(e) {
      setInvetoryList([{ status: 'error' }])
    }
  }

  useEffect(() => {
    getInventoryList()
  }, [])

  console.log(invetoryList, '===invetoryList==')
  return (
    <Box m='20px'>
      <Header 
        title='Inventory List'
        subtitle='Managing the Inventing' 
      />
      <Box
        m='0 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700]
          },
          '& .MuiDataGrid-row': {
            borderBottom: 'none !important'
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        <DataGrid
          rows={ (invetoryList && invetoryList[0]?.status === 'success' && invetoryList.data) || [] }
          columns={ columns }
          getRowId={ (row) => row.inventory_id }
        />
      </Box>
    </Box>
  )
}

export default Inventory
