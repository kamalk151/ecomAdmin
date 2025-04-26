import { 
  Box,Tab
} from '@mui/material'
import { useState } from 'react'
import ProductStepOne from './ProductStepOne'
import useMediaQuery from '@mui/material/useMediaQuery'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Header from '../../../components/Header'
import ProductStepTwo from './ProductStepTwo'
import ProductStepThree from './ProductStepThree'

const NewProduct = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [tabsVal, setTabsVal] = useState('1')

  const handleTabsChange = (event, newValue) => {
    setTabsVal(newValue)
  }
  console.log(tabsVal, 'products----------------', isNonMobile)
 
  return (
    <Box m='20px' sx={{ width: '100%' }}>
      <Header title='ADD PRODUCT' subtitle='Create a new product' />
      <TabContext value={tabsVal}>
        <TabList
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs example'
          onChange={handleTabsChange}
        >
          <Tab value='1' label='Product Step-1' />
          <Tab value='2' label='Product Step-2' />
          <Tab value='3' label='Product Step-3' />
        </TabList>
        <TabPanel value='1'><ProductStepOne /></TabPanel>
        <TabPanel value='2'><ProductStepTwo /></TabPanel>
        <TabPanel value='3'><ProductStepThree /></TabPanel>
      </TabContext>
    </Box>
  )
}

export default NewProduct