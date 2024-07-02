import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import moment from 'moment';

interface InventoryCalendarItem {
  id: string;
  date: string;
  available: number;
  status: boolean;
  booked: number;
}

interface RatePlanCalendarItem {
  id: string;
  date: string;
  rate: number;
  min_length_of_stay: number | null;
  reservation_deadline: number | null;
}

interface RatePlan {
  id: number;
  name: string;
  calendar: RatePlanCalendarItem[];
}

interface Room {
  id: string;
  name: string;
  occupancy: number;
  inventory_calendar: InventoryCalendarItem[];
  rate_plans: RatePlan[];
}

interface RoomCalendarResponse {
  code: string;
  message: string;
  data: Room[];
}

interface RoomCalendarProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const RoomCalendar: React.FC<RoomCalendarProps> = ({ startDate, endDate }) => {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(()=> {
    if (startDate && endDate) {
      
      const fetchData = async () => {
        try {
          const response = await axios.get<RoomCalendarResponse>(
            `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`
          );
          setRoomData(response.data.data);


          const allDates = response.data.data
            .flatMap(room => room.inventory_calendar.map(inv => inv.date))
            .filter((value, index, self) => self.indexOf(value) === index);
          setDates(allDates);
         console.log(allDates)
          
        } catch (error) {
          console.error('Error fetching room calendar data:', error);
        }
      };

      fetchData();
    }
  }, [startDate, endDate]);

  if (!startDate || !endDate) {
    return (
      <Container className="mb-5">
        <Typography variant="h6" align="center">
          Please select a date range to view the calendar.
        </Typography>
      </Container>
    );
  }

  return (
    <Container className='mb-5'>
      <TableContainer component={Paper}>
        <Table className='p-5'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {dates.map(date => (
                <TableCell key={date} align="center">{moment(date).format("L")}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {roomData.map(room => (
              <React.Fragment key={room.id}>
       
                  <h1 className='font-bold text-[20px] px-5 py-4 whitespace-nowrap'>{room.name}</h1>
           
             
                <TableRow>
                  <TableCell>Rooms Status</TableCell>
                  {dates.map(date => {
                    const inventory = room.inventory_calendar.find(inv => inv.date === date);
                    return (
                      <TableCell key={date} align="center" style={{ backgroundColor: inventory?.status ? 'green' : 'red', color: 'white' }}>
                        {inventory ? (inventory.status ? 'Open' : 'Closed') : '-'}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell>Rooms to sell</TableCell>
                  {dates.map(date => {
                    const inventory = room.inventory_calendar.find(inv => inv.date === date);
                    return <TableCell key={date} align="center">{inventory ? inventory.available : '-'}</TableCell>;
                  })}
                </TableRow>
                <TableRow>
                  <TableCell>Net booked</TableCell>
                  {dates.map(date => {
                    const inventory = room.inventory_calendar.find(inv => inv.date === date);
                    return <TableCell key={date} align="center">{inventory ? inventory.booked : 0}</TableCell>;
                  })}
                </TableRow>
                {room.rate_plans.map(ratePlan => (
                  <React.Fragment key={ratePlan.id}>
                    <TableRow>
                      <TableCell>{ratePlan.name} Rate</TableCell>
                      {dates.map(date => {
                        const rate = ratePlan.calendar.find(rate => rate.date === date);
                        return (
                          <TableCell key={date} align="center">
                            {rate ? `$${rate.rate}` : 'null'}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell> Min Length of Stay</TableCell>
                      {dates.map(date => {
                        const rate = ratePlan.calendar.find(rate => rate.date === date);
                        return (
                          <TableCell key={date} align="center">
                            {rate && rate.min_length_of_stay !== null ? rate.min_length_of_stay : 'null'}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell> Reservation Deadline</TableCell>
                      {dates.map(date => {
                        const rate = ratePlan.calendar.find(rate => rate.date === date);
                        return (
                          <TableCell key={date} align="center">
                            {rate && rate.reservation_deadline !== null ? rate.reservation_deadline : 'null'}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RoomCalendar;
