import { useState } from 'react'
import { Box, Typography, useTheme, Link } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
// import { mockDataUser } from '../../data/mockData'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import Header from '../../components/Header'
// import  Checkbox from '@mui/material/Checkbox'
import { useEffect } from 'react'

const Users = () => {
  const theme = useTheme()
  const [userList, setUserList] = useState([])
  const colors = tokens(theme.palette.mode)
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'accessLevel',
      headerName: 'Access Level',
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
            {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {access === 'manager' && <SecurityOutlinedIcon />}
            {(access !== 'user' || access !== 'admin') && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {(access !== 'user' || access !== 'admin') && 'Other'}
            </Typography>
          </Box>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width='60%'
            m='0 auto' 
            display='flex'
            justifyContent='center'
            borderRadius='4px'
            id={status}
          >
            {/* <Checkbox 
              type="checkbox"
              defaultChecked={ status === 'Active' ? true : false }
              name= { 'name' }
              value= { 'value' }
              onChange={ 'handler' }
              title={ status === 'Active' ? 'Active': 'In-Active'}
            /> */}
            <Link color={colors.greenAccent[100]}
              className='cursor'> Info </Link>
          </Box>
        )
      }
    }
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

  
  const fetchUsers = async () => {
    try {
      const userRes = await fetch('http://localhost:8080/admin/userLists')
      setUserList([{status: 'loading'}])
      if(userRes.ok) {
        const result = await userRes.json()
        setUserList(result)
        console.log(userList, 'ikkkk', result)
      }    
    }
    catch(e) {
      console.log(e,' ==e')
      setUserList([{status: 'error'}])
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  
  return (
    <Box m='10px'>
      <Header m='0 0 5px 0' title='Users' subtitle='Managing the Users' />
      <Box
        height='95vh'
      >
        <DataGrid sx={sx}
          id='sd'
          checkboxSelection 
          components={{ Toolbar: GridToolbar }}
          rows={userList.status === 'success' ? userList.data: []}
          columns={columns} 
        />
      </Box>
    </Box>
  )
}

export default Users
