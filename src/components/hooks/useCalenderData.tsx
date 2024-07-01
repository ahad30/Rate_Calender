
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useroomData = () => {

    const { refetch, data: roomData = [] } = useQuery({
        queryKey: ['roomData'],
        queryFn: async() => {
            const res = await axios.get(`https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=2024-05-01&end_date=2024-05-15`);
            return res?.data?.data;
        }
    })

    return [roomData, refetch]
}

export default useroomData