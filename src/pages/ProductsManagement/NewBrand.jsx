import {
  Box,
  Button,
  TextField,
  Divider,
  useTheme
} from '@mui/material'
import { tokens } from '../../theme'
import { Formik } from 'formik'
import * as yup from 'yup'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useGetBrandList } from './hooks'
import Notification from '../Notification'


const NewBrand = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [openMsg, setOpenMsg] = useState(false)
  const [responseMsg, setResponseMsg] = useState({ message: '', status: '' })
  // const isNonMobile = useMediaQuery('(min-width:600px)')
  const {brandList, getBrandList} = useGetBrandList()
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setResponseMsg({ message: '', status: '' })
      const response = await fetch('http://localhost:8080/admin/newBrand', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, 
        // same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(values) // body data type must match 'Content-Type' header
      })

      const result = await response.json()
      setOpenMsg(true)
      if(response.ok) {
        resetForm({})
        setResponseMsg({ message: result.message, status: result.status })
      } else {
        setResponseMsg({ 
          message: `${result.message}`,
          status: 'error'
        })
      }
    } catch (error) {
      setOpenMsg(true)
      setResponseMsg({ 
        message: `${error}`,
        status: 'error' 
      })
    }
    // parses JSON response into native JavaScript objects})
  }

  useEffect(() => {
    getBrandList()
  }, [responseMsg.status === 'success'])

  const columns = [
    {
      field: 'brand_id',
      headerName: 'ID',
      flex: 1,
      renderCell: ({row}) => row.brand_id,
      cellClassName: 'bradn-column--cell',
    },
    {
      field: 'brand_name',
      headerName: 'Brand Name',
      flex: 1
      // renderCell: ({ row: { productId } }) => {
      //   return ( productId.join(', ') )
      // }
    },
    {
      field: 'createdAt',
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
    <Box m='20px'>
      { openMsg && <Notification
        open={openMsg}
        onClose={setOpenMsg}
        autoHideDuration={6000}
        message={responseMsg.message}
        severity={responseMsg.status}
        action={''}
      />
      }
      <Header title='BRAND LIST' subtitle='Brand Lists / Create new brand for all product' />
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
          <form className='addbrandForm form-transform' onSubmit={handleSubmit}>
            <Box display={'inline-flex'}>
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Enter Brand *'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brandName}
                name='brandName'
                error={!!touched.brandName && !!errors.brandName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
            
              <Button
                type='submit'
                color='secondary'
                variant='contained'
              >
                Save
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Divider 
        sx={{'mt': '10px'}}
        component='' orientation='horizontal' variant='' />
      <Box
        height='65vh'
        mt='20px'
      >
        <DataGrid
          sx={sx}
          rows={brandList?.status === 'success' ? brandList.data : []}
          columns={columns}
          getRowId={(row) => row.brand_id}
        />
      </Box>
    </Box>
  )
}

const checkoutSchema = yup.object().shape({
  brandName: yup.string().required('required')
})

const initialValues = {
  brandName: ''
}

export default NewBrand