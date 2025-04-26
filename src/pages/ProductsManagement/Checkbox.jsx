import { 
  Box,
  Typography,
  Checkbox
} from '@mui/material'

const CheckboxInput = (props) => {
  return (
    <Box m='0px' display={'flex'} >
      {
        props.checkBoxObj.map((obj, key) => {
          const styleObj = {}
          styleObj[`&, & .${obj.className}`] = {
            color:`${obj.color} !important`
          }
          return <Box key={key} title={obj.color}>
            <Typography>{ obj.label }</Typography>
            <Checkbox
              color='default'
              sx={styleObj}
              type='checkbox'
              className={obj.className}
              defaultChecked={ true }
              id={ obj.id }
              value={ obj.color }
              onChange={ props.handler }
            />
          </Box>
        })
      }
    </Box>
  )
}

export default CheckboxInput