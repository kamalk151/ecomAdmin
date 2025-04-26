import { useContext, useState } from 'react'
import PageContainer from './pages'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import { AuthContext } from './AuthContext'

function App() {
  const [theme, colorMode] = useMode()
  const contextValue = useContext(AuthContext)
  const [contextState, setContextState] = useState(contextValue)
  
  const authProvider = {
    ...contextState,
    setContextState
  }
  console.log(authProvider, '=====authProvider---', contextState)
  return (
    <ColorModeContext.Provider value={colorMode}>
      <AuthContext.Provider value={authProvider} >
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <div className='app'>
            <PageContainer />
          </div>
        </ThemeProvider>
      </AuthContext.Provider>
    </ColorModeContext.Provider>
  )
}


export default App
