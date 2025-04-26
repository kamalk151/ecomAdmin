import { Typography, Box, useTheme, Button } from '@mui/material'
import { tokens } from '../theme'

const Header = ({ title, subtitle, action }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box mb='15px'>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography
          variant='h2'
          color={colors.grey[100]}
          fontWeight='bold'
          sx={{ m: '0 0 5px 0' }}
        >
          {title}
        </Typography>
        { 
          action?.actionName &&
          <Button sx={{
            backgroundColor: colors.primary[700],
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
          }} 
          onClick={action.dialogHandler}
          >
            { action.actionName }
          </Button>
        }
      </Box>
      <Typography variant='h5' color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    
    </Box>
  )
}

export default Header