import { ThemeProvider } from '@mui/material'
import { customTheme } from './utilities/theme'
import 'normalize.css'

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      App Content...
    </ThemeProvider>
  )
}

export default App
