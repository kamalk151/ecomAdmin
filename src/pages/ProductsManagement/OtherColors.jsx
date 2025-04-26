import { 
  Box,
  Button
} from '@mui/material'
import { useState, useRef } from 'react'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import CheckboxInput from './Checkbox'

const OtherColor = ({ setOtherColors, otherColors }) => {
  const [colorField, setColorField] = useState([])
 
  const inputRef = useRef({})
  const handleColorRemove = (e) => {
    const colorFieldlist = [...colorField]
    const refObj = { ...inputRef.current }
    delete refObj[`boxColorId${e.target.id}`]
    colorFieldlist.splice((e.target.parentNode.id), 1)
    setColorField(colorFieldlist)
    delete otherColors[`colorId${e.target.id}`]
    setOtherColors({ ...otherColors })
  }

  const staticColorHandler = (e) => {
    console.log(e, e.target.id)
    setOtherColors({ ...otherColors,
      [e.target.id]: e.target.checked ? e.target.value : ''
    })
  }
  // static color 
  const colorList = [{
    color: '#838388',
    id: 'staticColorId1',
    label: 'Grey',
    className:'greyCheck'
  },{
    color: '#060101',
    id: 'staticColorId2',
    label: 'Black',
    className:'blackCheck'
  },{
    color: '#ffc0cb',
    id: 'staticColorId3',
    label: 'Pink',
    className:'pinkCheck'
  },{
    color: '#0000ff',
    id: 'staticColorId4',
    label: 'Blue',
    className:'yellowCheck'
  }]

  const colorPicker = (e) => {
    const colorList = { ...otherColors }
    const { id, value } = e.target
    colorList[id] = value
    setOtherColors(colorList)
  }

  const addNewColors = () => {
    if (colorField.length > 10) return false
    setColorField([...colorField,
      (colorField.length ?  Math.max(...colorField) + 1 : 0) ])
  }

  return (
    <>
      <CheckboxInput 
        checkBoxObj={ colorList }
        handler= { staticColorHandler }
      />
      <Button variant='contained' color='primary' type='button' onClick={ addNewColors }> Add new colour + </Button>
      <Box
        m='5px'
        id='newColor'
        display={'flex'}
        sx={{ gridColumn: 'span 4' }}
      >
        {
          colorField && colorField.map((val, key) => {
            return <Box
              sx={{'cursor':'pointer', 'textAlign': 'center'}}
              ref={(ref) => inputRef.current[`boxColorId${val}`] = ref }
              key={val} id={`boxColorId${val}`} paddingX={'10px'} 
            >
              <input
                type='color'
                id={`colorId${val}`}
                onChange={ colorPicker }
                value={otherColors[`colorId${val}`] || '#f6b73c' }
              />
              <p
                aria-hidden='true' 
                id={`${key}`}
                data-box-id={`${val}`}
                onClick={ handleColorRemove }
              >
                <DeleteSharpIcon /> 
              </p>
            </Box>
          })
        }
      </Box>
    </>
  )
}

export default OtherColor