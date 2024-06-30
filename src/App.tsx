import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const queryClient = new QueryClient();
import './App.css'
import DateRanger from './components/DateRanger';

function App() {
  
return (
 <>
  <QueryClientProvider client={queryClient}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <section className='max-w-6xl mx-auto mt-5'>
  <DateRanger></DateRanger>
  </section>
  </LocalizationProvider>
  </QueryClientProvider>
 </>
  )
}

export default App
