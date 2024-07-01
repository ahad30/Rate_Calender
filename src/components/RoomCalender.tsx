import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React from 'react';

// Define the interface for the inventory calendar item
interface InventoryCalendarItem {
  id: string;
  date: string;
  available: number;
  status: boolean;
  booked: number;
}

// Define the interface for the rate plan calendar item
interface RatePlanCalendarItem {
  id: string;
  date: string;
  rate: number;
  min_length_of_stay: number | null;
  reservation_deadline: number | null;
}

// Define the interface for the rate plan
interface RatePlan {
  id: number;
  name: string;
  calendar: RatePlanCalendarItem[];
}

// Define the interface for the room
interface Room {
  id: string;
  name: string;
  occupancy: number;
  inventory_calendar: InventoryCalendarItem[];
  rate_plans: RatePlan[];
}

// Define the interface for the entire JSON response
interface RoomCalendarResponse {
  code: string;
  message: string;
  data: Room[];
}

const RoomCalendar = () => {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get<RoomCalendarResponse>('https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=2024-05-01&end_date=2024-05-15');
        setRoomData(response.data.data);

        // Extract the unique dates from the inventory calendar
        const allDates = response.data.data
          .flatMap(room => room.inventory_calendar.map(inv => inv.date))
          .filter((value, index, self) => self.indexOf(value) === index);
        setDates(allDates);
      } catch (error) {
        console.error('Error fetching room calendar data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Room Calendar
      </Typography>
      <TableContainer component={Paper}>
        <Table className='p-5'>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              {dates.map(date => (
                <TableCell key={date} align="center">{new Date(date).toLocaleDateString()}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {roomData.map(room => (
              <React.Fragment key={room.id}>
             <Typography variant="h6" >{room.name}</Typography>
                <TableRow>
                <TableCell>Rooms Status </TableCell>
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
                    return <TableCell key={date} align="center">{inventory ? inventory.booked : '-'}</TableCell>;
                  })}
                </TableRow>

                {room.rate_plans.map(ratePlan => (
                  <TableRow key={ratePlan.id}>
                    <TableCell>{ratePlan.name}</TableCell>
                    {dates.map(date => {
                      const rate = ratePlan.calendar.find(rate => rate.date === date);
                      return (
                        <TableCell key={date} align="center">
                          {rate ? `${rate.rate}` : '-'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
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
