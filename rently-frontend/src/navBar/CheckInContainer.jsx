import { useEffect, useState } from "react";
import Calendar from "./calendar.jsx";
import "./CheckInContainer.scss"
import emptyIcon from "../assets/empty.png";

export default function CheckInContainer(props){
    const [choosenDate, setChoosenDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    });
    const [choosenContainer, setChoosenContainer] = useState("dates");
    const [datesMargin, setDatesMargin] = useState("Exact");


    const checkInDates =()=>{
        
          return(
          <div id="check-in-dates">
            <div id="calendars-container">
            <Calendar checkInDate={props.checkInDate} checkOutDate={props.checkOutDate} setCheckInDate={props.setCheckInDate} setCheckOutDate={props.setCheckOutDate} activeTab={props.activeTab} year ={choosenDate.year} month={choosenDate.month}></Calendar>
            {/* <Calendar setCheckInDate={props.setCheckInDate} setCheckOutDate={props.setCheckOutDate} activeTab={props.activeTab} year ={choosenDate.year} month={choosenDate.month+1}></Calendar> */}
            </div>
            <div id="dates-margin">
              <button onClick={()=>setDatesMargin("Exact")} style={datesMargin === "Exact" ? {backgroundColor:"var(--main-grey-color)", border:"2px solid black"}: {backgroundColor:"rgba(255, 255, 255, 0)", border:"2px solid grey"}}>Exact dates</button>
              <button onClick={()=>setDatesMargin("1")} style={datesMargin === "1" ? {backgroundColor:"var(--main-grey-color)", border:"2px solid black"}: {backgroundColor:"rgba(255, 255, 255, 0)", border:"2px solid grey"}}>± 1 day</button>
              <button onClick={()=>setDatesMargin("2")} style={datesMargin === "2" ? {backgroundColor:"var(--main-grey-color)", border:"2px solid black"}: {backgroundColor:"rgba(255, 255, 255, 0)", border:"2px solid grey"}}>± 2 days</button>
              <button onClick={()=>setDatesMargin("3")} style={datesMargin === "3" ? {backgroundColor:"var(--main-grey-color)", border:"2px solid black"}: {backgroundColor:"rgba(255, 255, 255, 0)", border:"2px solid grey"}}>± 3 days</button>
              <button onClick={()=>setDatesMargin("7")} style={datesMargin === "7" ? {backgroundColor:"var(--main-grey-color)", border:"2px solid black"}: {backgroundColor:"rgba(255, 255, 255, 0)", border:"2px solid grey"}}>± 7 days</button>
              <button onClick={()=>setDatesMargin("14")} style={datesMargin === "14" ? {backgroundColor:"var(--main-grey-color)", border:"2px solid black"}: {backgroundColor:"rgba(255, 255, 255, 0)", border:"2px solid grey"}}>± 14 days</button>
            </div>
          </div>
          )
      }


      function renderContainer(){
        switch(choosenContainer){
            case "dates":
                return checkInDates()
             default:
                console.error("Cannot get container")
        }
      }
    return(
        
        <div id="check-in-drop-container">
            <div id="type-time">
              <button onClick={()=>setChoosenContainer("dates")} style={choosenContainer === "dates" ? {backgroundColor: "white"}: {backgroundColor:"rgba(255, 255, 255, 0)"}}>Dates</button>
              <button onClick={()=>setChoosenContainer("months")} style={choosenContainer === "months" ? {backgroundColor: "white"}: {backgroundColor:"rgba(255, 255, 255, 0)"}}>Months</button>
              <button onClick={()=>setChoosenContainer("flexible")} style={choosenContainer === "flexible" ? {backgroundColor: "white"}: {backgroundColor:"rgba(255, 255, 255, 0)"}}>Flexible</button>
            </div>
              {renderContainer()}
          </div>
          
    )
}