import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

const DateRanger = () => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2024-04-17'));
  return (
    <DemoContainer components={['DatePicker', 'DatePicker']}>
    <DatePicker label="Start" defaultValue={dayjs('2024-06-17')} />
    <DatePicker
      label="End"
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  </DemoContainer>
  )
}

export default DateRanger