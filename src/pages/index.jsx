import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import Topbar from './global/Topbar'
import Sidebar from './global/Sidebar'
import ProtectedRoute from './../AuthComponent/ProtectedRoute'
import AuthComponent from './../AuthComponent'
import { useAuthHooks } from '../AuthComponent/hooks'

const LoadablePage = loadable((props) => import(`.${props.page}`), {
  fallback: <div className='page-loader'><CircularProgress color='secondary' /></div>,
  cacheKey: (props) => props.page
})

const PageContainer = () => {
  const { authContext : { isSideBar, isLoggedIn }} = useAuthHooks()
  const pageObject = [
    {path: '/', page: '/dashboard'},
    {path: '/team', page: '/team'},
    {path: '/line', page: '/line'},
    {path: '/contacts', page: '/contacts'},
    {path: '/invoices', page: '/invoices'},
    {path: '/filter', page: '/contacts'},
    {path: '/users', page: '/UsersManagement/index'},
    {path: '/users/new-user', page: '/UsersManagement/CreateNewUser'},
    {path: '/orders', page: '/OrdersManagement'},
    {path: '/orders/order-history', page: '/OrdersManagement/OrderHistory'},
    {path: '/inventory', page: '/InventoryManagement'},
    {path: '/inventory/new-inventory', page: '/InventoryManagement/NewInventory'},
    {path: '/products', page: '/ProductsManagement'},
    {path: '/product/product-history', page: '/ProductsManagement/ProductHistory'},
    {path: '/product/new-product', page: '/ProductsManagement/AddProduct/index'},
    {path: '/product/product-img', page: '/ProductsManagement/ProductImg'},
    {path: '/product/product-brand', page: '/ProductsManagement/NewBrand'}
  ]

  return (
    <>
      { isSideBar && <Topbar /> }
      <main className='content' style={{ display: 'flex' }}>
        { isSideBar && <Sidebar /> }
        <Box flexGrow={1}>
          <Routes>
            { /* Other pages component */
              pageObject.map((pages, key) => {
                return <Route key={key} path={pages.path} element={
                  <ProtectedRoute> <LoadablePage page={pages.page} /> </ProtectedRoute> } />
              })
            }
            {/* Login component */}
            { !isLoggedIn &&
              <Route key={22} path='/login' element={ <AuthComponent /> } />
            }
          </Routes>
        </Box>
      </main>
    </>
  )
}

export default PageContainer
