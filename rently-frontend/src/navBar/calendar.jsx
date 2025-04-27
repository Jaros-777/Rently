import { useState } from "react";
import "./calendar.scss";

export default function Calendar(props) {
  const [selectedFirstDay, setSelectedFirstDay] = useState({
    day: null,
    month: null,
    year: null
  });
  const [selectedLastDay, setSelectedLastDay] = useState({
    day: null,
    month: null,
    year: null
  });

  const[currentMonth, setCurrentMonth] = useState(props.month)
  const[nextMonth, setNextMonth] = useState(props.month+1)
  const[currentYear, setCurrentYear] = useState(props.year)
  const[nextYear, setNextYear] = useState(props.year)

  const currentDate = new Date(currentYear, currentMonth);
  const nextDate = new Date(nextYear, nextMonth);

  const firstDayInCurrentMonth = new Date(currentYear, currentMonth, 0).getDay();
  const currentEmptyDays = Array.from(
    { length: firstDayInCurrentMonth },
    (_, index) => null
  );
  const firstDayInNextMonth = new Date(nextYear, nextMonth, 0).getDay();
  const nextEmptyDays = Array.from(
    { length: firstDayInNextMonth },
    (_, index) => null
  );

  let behindDays = [];
  if (new Date().getMonth() == currentMonth && new Date().getFullYear() == currentYear) {
    behindDays = Array.from(
      { length: new Date().getDate() - 1 },
      (_, index) => index + 1
    );
  }

  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const futureCurrentDays = Array.from(
    { length: daysInCurrentMonth - behindDays.length },
    (_, index) => index + behindDays.length + 1
  );
  const daysInNextMonth = new Date(nextYear, currentMonth + 2, 0).getDate();
  const futureNextDays = Array.from(
    { length: daysInNextMonth },
    (_, index) => index + 1
  );

  const chooseDay = (day, date) => {
    const choosenDate = new Date(date.getYear(), date.getMonth(), day);
    //console.log(choosenDate.toString())

    if (props.activeTab == "check-in") {
      if (props.checkOutDate < choosenDate) {
        props.setCheckOutDate("Add dates");
        setSelectedLastDay({ day: null, month: null });
      } 

        props.setCheckInDate(choosenDate);
        setSelectedFirstDay({ day: day, month: date.getMonth(), year: date.getFullYear() });

      
    } else if (props.activeTab == "check-out") {

      if (props.checkInDate > choosenDate) {

        props.setCheckInDate(choosenDate);
        setSelectedFirstDay({ day: day, month: date.getMonth(), year: date.getFullYear() });
        props.setCheckOutDate("Add dates");
        setSelectedLastDay({ day: null, month: null });

      } else {
        props.setCheckOutDate(choosenDate);
        setSelectedLastDay({ day: day, month: date.getMonth(), year: date.getFullYear() });
      }
    }
  };

  const decrementMonth=()=>{
    if(currentMonth != props.month || currentYear != props.year) {

      if(currentMonth == 0 && nextMonth ==1){
        setCurrentMonth(11); 
        setNextMonth(nextMonth-1)
        setCurrentYear(currentYear-1)
      }else if (currentMonth == 11 && nextMonth ==0){
        setCurrentMonth(currentMonth-1);  
        setNextMonth(11)
        setNextYear(nextYear-1)
      }
      else{

        setCurrentMonth(currentMonth-1); 
        setNextMonth(nextMonth-1)
      }
      console.log(currentMonth,nextMonth )
    }
  }
  const incrementMonth=()=>{

      if(currentMonth == 10 && nextMonth ==11){
        console.log("koniec roku")
        setCurrentMonth(currentMonth+1); 
        setNextMonth(0)
        setNextYear(nextYear+1)
      }else if(currentMonth == 11 && nextMonth ==0){
        setCurrentMonth(0)
        setNextMonth(nextMonth+1)
        setCurrentYear(currentYear+1)
      }else{
        
        setCurrentMonth(currentMonth+1); 
        setNextMonth(nextMonth+1)
      }
      console.log(currentMonth,nextMonth )
      
  }

  return (
    <>
    <div id="btn-prevoius">
      <button onClick={decrementMonth} style={(currentMonth == props.month && currentYear == props.year) ? {cursor:"default"} : null} >{currentMonth == props.month && currentYear == props.year? null : "<"}</button>
    </div>
      <div id="calendar-container">
        <h4>
          {currentDate.toLocaleDateString("en-US", { month: "long" })}{" "}
          {currentYear}
        </h4>
        <div id="calendar-content">
          <p>Mo</p>
          <p>Tu</p>
          <p>We</p>
          <p>Th</p>
          <p>Fr</p>
          <p>Sa</p>
          <p>Su</p>
          {currentEmptyDays.map((num, index) => (
            <p key={index}>{num}</p>
          ))}
          {behindDays.map((num) => (
            <button className="behind-day" key={num}>
              {num}
            </button>
          ))}
          {futureCurrentDays.map((num) => (
            <button
              className={
                (selectedFirstDay.day == num &&
                  selectedFirstDay.month == currentDate.getMonth() &&
                selectedFirstDay.year == currentDate.getFullYear()) ||
                (selectedLastDay.day == num &&
                  selectedLastDay.month == currentDate.getMonth()&&
                  selectedLastDay.year == currentDate.getFullYear())
                  ? "selected-day"
                  : null
              }
              onClick={() => {
                chooseDay(num, currentDate);
              }}
              key={num}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div id="calendar-container">
        <h4>
          {nextDate.toLocaleDateString("en-US", { month: "long" })} {nextYear}
        </h4>
        <div id="calendar-content">
          <p>Mo</p>
          <p>Tu</p>
          <p>We</p>
          <p>Th</p>
          <p>Fr</p>
          <p>Sa</p>
          <p>Su</p>
          {nextEmptyDays.map((num, index) => (
            <p key={index}>{num}</p>
          ))}
          {futureNextDays.map((num) => (
            <button
              className={
                (selectedFirstDay.day == num &&
                  selectedFirstDay.month == nextDate.getMonth() &&
                selectedFirstDay.year == nextDate.getFullYear()) ||
                (selectedLastDay.day == num &&
                  selectedLastDay.month == nextDate.getMonth()&&
                  selectedLastDay.year == nextDate.getFullYear())
                  ? "selected-day"
                  : null
              }
              onClick={() => {
                chooseDay(num, nextDate);
              }}
              key={num}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div id="btn-next">
      <button onClick={incrementMonth} >{">"}</button>
    </div>
    </>
  );
}
