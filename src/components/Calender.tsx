import useCalenderData from "./hooks/useCalenderData"


const Calender = () => {
    const [calenderData] = useCalenderData();
    console.log(calenderData)
  return (
    <div>Calender</div>
  )
}

export default Calender;