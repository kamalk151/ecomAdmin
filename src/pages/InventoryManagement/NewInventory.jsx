import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // DialogContentText
} from '@mui/material'
import { Formik } from 'formik'
import Notification from '../Notification'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery'
import Header from '../../components/Header'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '@emotion/react'
import { tokens } from '../../theme'

const NewInventory = () => {
  // const isNonMobile = useMediaQuery('(min-width:600px)')
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [productList, setProductList] = useState([])
  const [checkedItemList, setCheckedItemList] = useState([])
  const [responseMsg, setResponseMsg] = useState({ message: '', status: '' })
  const [openMsg, setOpenMsg] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log('form submit', checkedItemList)
    try {
      setResponseMsg({ message: '', status: '' })
      const response = await fetch('http://localhost:8080/admin/newInventory', {
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
        body: JSON.stringify({...values,
          itemList: checkedItemList,
          totalAmount: values.perProductAmt * values.totalQnt,
          createdBy:1 })
        // body data type must match 'Content-Type' header
      })

      const result = await response.json()
      setOpenMsg(true)
      if(response.ok) {
        resetForm({})
        setIsDialogOpen(false)
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
  }

  const dialogHandler = () => {
    setOpenMsg(false)
    if(checkedItemList.length) {
      setIsDialogOpen(true)
    } else {
      setOpenMsg(true)
      setResponseMsg({ message: 'Please choose one or more than one product.', status: 'error' })
    }
  }

  const handleClose = () => {
    setIsDialogOpen(false)
  }

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/getProductList')
      setProductList([{status: 'loading'}])
      if(response.ok) {
        const result = await response.json()
        setProductList(result)
        console.log(productList, 'ikkkk', result)
      }    
    }
    catch(e) {
      console.log(e,' ==e')
      setProductList([{status: 'error'}])
    }
  }

  useEffect(() => {
    getProducts()
    console.log(productList,'===productList')
  }, [])

  const columns = [
    { field: 'product_id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
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
      field: 'mrp',
      headerName: 'MRP.',
      flex: 1
    },
    {
      field: 'amount',
      headerName: 'Sell Price',
      flex: 1
    },
    {
      field: 'currentStock',
      headerName: 'Existing Stock',
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
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {access}
            </Typography>
          </Box>
        )
      }
    }
  ]

  return (
    <Box m='20px'>
      <Header title='ADD INVENTORY' subtitle='Choose below product rows for adding inventory' action={{
        actionName: 'New Inventory',
        type: 'button',
        class: '',
        dialogHandler: dialogHandler
      }} />
      {/* Notification box */}
      { openMsg && <Notification
        open={openMsg}
        onClose={setOpenMsg}
        autoHideDuration={6000}
        message={responseMsg.message}
        severity={responseMsg.status}
        action={''}
      />
      }
      {/* Inventory dialog box */}
      <Dialog open={isDialogOpen} onClose={handleClose} sx={{
        '& .css-1qxadfk-MuiPaper-root-MuiDialog-paper' : { 
          'height': '70vh'
        }
      }}>
        <DialogTitle>
          Product Inventory
          <Typography
            variant='h2'
            fontWeight='light'
            sx={{ color: colors.grey[100] }}
          >
            { `{ ${checkedItemList.length} }` } items selected for inventory.
          </Typography>
        </DialogTitle>
        
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={formValidation}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form
              className='addInventoryForm form-transform'
              onSubmit={handleSubmit}
            >
              <DialogContent sx={{
                '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
                  'marginBottom': '10px'
                },
                'display': 'grid',
                'minWidth': '75vh'
              }}>
                
                <TextField
                  variant='filled'
                  type='text'
                  label='Enter min quantity for alarming'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.minQnt}
                  name='minQnt'
                  error={!!touched.minQnt && !!errors.minQnt}
                  helperText={touched.minQnt && errors.minQnt} />

                <TextField
                  variant='filled'
                  type='text'
                  label='Enter total stock/quantity'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.totalQnt}
                  name='totalQnt'
                  error={!!touched.totalQnt && !!errors.totalQnt}
                  helperText={touched.totalQnt && errors.totalQnt} />

                <TextField
                  variant='filled'
                  type='text'
                  title='Purchase price'
                  label='Enter per product price'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.perProductAmt}
                  name='perProductAmt'
                  error={!!touched.perProductAmt && !!errors.perProductAmt}
                  helperText={touched.perProductAmt && errors.perProductAmt} />

                <TextField
                  variant='filled'
                  type='text'
                  readOnly='true'
                  title='Enter total stock/quantity price'
                  onBlur={handleBlur}
                  disabled
                  value={((values.perProductAmt && (values.totalQnt * values.perProductAmt))
                    || values.totalAmount) }
                  name='totalAmount'
                />
                
              </DialogContent>
              <DialogActions>
                <Button variant='contained' color='primary' type='button' onClick={handleClose}>Cancel</Button>
                <Button variant='contained' color='primary' type='submit' >Submit</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <Box
        m='15px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.primary[700],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.primary[700]
          },
          '& .MuiDataGrid-row': {
            borderBottom: 'none !important'
          },
          '& .MuiCheckbox-root': {
            color: `${colors.primary[200]} !important`
          }
        }}
      >
        <DataGrid 
          checkboxSelection
          onSelectionModelChange={(itemList)=> setCheckedItemList(itemList)}
          // isRowSelectable={''}
          onRowClick={(er)=> console.log(er, '=row selection') }
          columns={columns}
          rows={
            productList?.status === 'success'
              ? productList.data
              : []
          }
          getRowId={(row) => row.product_id}
        />
      </Box>
    </Box>
  )
}

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

const formValidation = yup.object().shape({
  // firstName: yup.string().required('required'),
  totalQnt: yup.number().required('required'),
  minQnt: yup.number().required('required'),
  // minQnt: yup.string().email('invalid email').required('required'),
  // minQnt: yup
  //   .string()
  //   .matches(phoneRegExp, 'Phone number is not valid')
  //   .required('required'),
  perProductAmt: yup.number().required('required'),
  // totalAmount: yup.number().required('required')
})

const initialValues = {
  totalQnt: '',
  minQnt: '',
  perProductAmt: '',
  totalAmount: ''
}

export default NewInventory