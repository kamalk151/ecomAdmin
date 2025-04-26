import { MenuItem } from 'react-pro-sidebar'
import { Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../theme'

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
      >
        <Typography></Typography>
        <Link to={to} />
      </MenuItem>
    </MenuItem>
  )
}

export default Item