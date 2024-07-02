import  { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './App.css'
import DateRanger from './components/DateRanger';

import RoomCalendar from './components/RoomCalender';
import { Typography } from '@mui/material';

const queryClient = new QueryClient();


function App() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-04-30'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date));

return (
 <>
  <QueryClientProvider client={queryClient}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <section className='max-w-6xl mx-auto mt-5'>
  <Typography className='' variant="h4" gutterBottom>
        Rate Calendar
      </Typography>
  <DateRanger
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <RoomCalendar startDate={startDate} endDate={endDate} />
  </section>
  </LocalizationProvider>
  </QueryClientProvider>
 </>
  )
}

export default App
