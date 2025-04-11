import { useState } from "react";
import "./calendar.scss";

export default function Calendar(props) {

  const date = new Date(props.year, props.month)
  
  const firstDayInMonth = new Date(props.year, props.month, 0).getDay();
  let emptyDays = Array.from({length: firstDayInMonth}, (_, index) => null);

  const fullDays = Array.from({length: new Date(props.year, props.month +1, 0).getDate()}, ((_, index) => index + 1));

  

  return (
    <div id="calendar-container">
      <h4>
        {date.toLocaleDateString("en-US", {month:"long"})} {props.year}
      </h4>
      <div id="calendar-content">
        <p>Mo</p>
        <p>Tu</p>
        <p>We</p>
        <p>Th</p>
        <p>Fr</p>
        <p>Sa</p>
        <p>Su</p>
        {emptyDays.map((num)=>(
          <p key={num}>{num}</p>
        ))}
        {fullDays.map((num)=>(
          <p className="full-day" key={num}>{num}</p>
        ))}
      </div>
      
    </div>
  );
}
