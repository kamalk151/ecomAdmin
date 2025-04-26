import { useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../theme'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import Person3Icon from '@mui/icons-material/Person3'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import Item from './Items'

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('dashboard')

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Typography variant='h3' color={colors.grey[100]}>
                  DashBoard
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px' textAlign='center'>
              <Typography
                variant='h2'
                color={colors.grey[100]}
                fontWeight='bold'
                sx={{ m: '10px 0 0 0' }}
              >
                john doe
              </Typography>
              <Typography variant='h2' color={colors.greenAccent[500]}>
                Test protoype
              </Typography>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu icon={<Person3Icon />} 
              title='User Management'
              label="User"
            >
              <Item
                title='Users List'
                to='/users/'
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Create New User'
                to='/users/new-user'
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu icon={<ShoppingCartTwoToneIcon />} 
              title='Order Management'
              label="Order"
            >
              <Item
                title='Orders List'
                to='/orders'
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Order History'
                to='/orders/order-history'
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu icon={<ShoppingCartTwoToneIcon />} 
              title='Invoice Management'
              label="Invoice"
            >
              <Item
                title='Invoice'
                to='/invoices'
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu icon={<ViewInArIcon />} 
              title='Product Management'
              label="Product"
            >
              <Item
                title='Brand / Manufaturer List'
                to='/product/product-brand'
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='New Product'
                to='/product/new-product'
                selected={selected}
                setSelected={setSelected}
              /> 
              <Item
                title='Products List'
                to='/products'
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Product Image'
                to='/product/product-img'
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title='Product History'
                to='/product/product-history'
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <SubMenu icon={<Inventory2Outlined />} 
              title='Inventory Management'
              label="Inventory"
            >
              <Item 
                title='Create Inventory'
                to='/inventory/new-inventory'
                selected={selected}
                setSelected={setSelected}
              />
              <Item 
                title='Inventory List'
                to='/inventory'
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <Item
              title='Product Filter'
              to='/filter'
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Contacts Message'
              to='/contacts'
              icon={<EmailTwoToneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Settings'
              to='/setting'
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar