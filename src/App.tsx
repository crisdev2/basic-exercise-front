import { ThemeProvider } from '@mui/material'
import { customTheme } from './utilities/theme'

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      App Content...
    </ThemeProvider>
  )
}

export default App
