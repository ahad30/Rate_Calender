import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

interface DateRangerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
}

const DateRanger: React.FC<DateRangerProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className='mb-5 p-5'>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Start"
          value={startDate}
          onChange={onStartDateChange}
        />
        <DatePicker
          label="End"
          value={endDate}
          onChange={onEndDateChange}
        />
      </DemoContainer>
    </div>
  );
};

export default DateRanger;
