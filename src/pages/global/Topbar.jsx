import { useState, useContext } from 'react'
import { Box, IconButton, useTheme, Menu, MenuItem, ClickAwayListener } from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { useAuthHooks } from '../../AuthComponent/hooks'

const Topbar = () => {
  const { destroySession } = useAuthHooks()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const [openProfile, setOpenProfile] = useState(false)

  return (
    <Box display='flex' justifyContent='space-between' p={2}>
      {/* SEARCH BAR */}
      <Box
        display='flex'
        backgroundColor={colors.primary[400]}
        borderRadius='3px'
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search' />
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display='flex'>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon onClick={ () => setOpenProfile(!openProfile) }/>
          <ClickAwayListener onClickAway={ () => ''}>
            <Menu 
              id='demo-positioned-menu'
              aria-labelledby='demo-positioned-button'
              anchorEl={null}
              open={openProfile}
              onClose={() => setOpenProfile(false)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem> My account </MenuItem>
              <MenuItem onClick={destroySession}> Logout </MenuItem>
            </Menu>
          </ClickAwayListener>
        </IconButton>
      </Box>
    </Box>
  )
}

export default Topbar 
