import { ThemeProvider } from '@mui/material'
import { customTheme } from './utilities/theme'
import 'normalize.css'
import UserLayout from './components/layout'

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <UserLayout />
    </ThemeProvider>
  )
}

export default App
