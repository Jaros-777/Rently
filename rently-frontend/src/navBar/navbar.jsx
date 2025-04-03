import earthIcon from "../assets/earth-icon.png";
import listIcon from "../assets/icon-list.png";
import profileIcon from "../assets/profile-icon.png";
import searchIcon from "../assets/search-icon.png";
import closeIcon from "../assets/icon-close-black.png";
import emptyIcon from "../assets/empty.png";
import Logo from "../assets/Rently-logo.webp";
import "./navbar.scss";
import { useEffect, useReducer, useState } from "react";
import { initialLine, reducerLine } from "./lineReducer.js";
import { SuggestedLocalizations } from "../DataBase/SuggestedLocalizations.js";

export default function NavBar() {
  const [bigNav, setBigNav] = useState(true);
  const [state, dispatch] = useReducer(reducerLine, initialLine);
  let [town, setTown] = useState("");
  const [proposalTowns, setProposalTowns] = useState([]);
  const [checkInContainer, setCheckInContainer] = useState(checkInDates);

  const handleNavBarSize = () => {
    const navHeight = document.getElementById("navbar-container").style;
    if (bigNav) {
      //setBigNav(false);
      //navHeight.height = "3rem";
    } else {
      setBigNav(true);
      navHeight.height = "9rem";
    }
  };

  const handleLineShow = (number) => {
    switch (number) {
      case 1:
        state.line1
          ? dispatch({ type: "Line-1-off" })
          : dispatch({ type: "Line-1-on" });
      case 2:
        state.line1
          ? dispatch({ type: "Line-1-off" })
          : dispatch({ type: "Line-1-on" });
        state.line2
          ? dispatch({ type: "Line-2-off" })
          : dispatch({ type: "Line-2-on" });
      case 3:
        state.line2
          ? dispatch({ type: "Line-2-off" })
          : dispatch({ type: "Line-2-on" });
        state.line3
          ? dispatch({ type: "Line-3-off" })
          : dispatch({ type: "Line-3-on" });
      case 4:
        state.line3
          ? dispatch({ type: "Line-3-off" })
          : dispatch({ type: "Line-3-on" });
    }
  };

  const handleChoosenOption = (option) => {
    let navContainer = document.getElementById("big-nav-inputs").style;
    let searchBtn = document
      .getElementById("input-search-btn")
      .querySelector("p").style;

    let whereContainer = document.getElementById("input-form-where");
    let checkInContainer = document.getElementById("input-form-check-in");
    let checkOutContainer = document.getElementById("input-form-check-out");
    let whoContainer = document.getElementById("input-form-who");
    let closeBtnWhere = document
      .getElementById("input-form-where")
      .querySelector("img");
    let closeBtnCheckIn = document
      .getElementById("input-form-check-in")
      .querySelector("img");
    let closeBtnCheckOut = document
      .getElementById("input-form-check-out")
      .querySelector("img");
    let closeBtnWho = document
      .getElementById("input-form-who")
      .querySelector("img");
    let closeIconToUse = closeIcon;

    let whereDropContext = document.getElementById("where-drop-container").style;
    let checkInDropContext = document.getElementById("check-in-drop-container").style;

    //reset
    whereContainer.classList.remove("changeBgColorToWhite");
    checkInContainer.classList.remove("changeBgColorToWhite");
    checkOutContainer.classList.remove("changeBgColorToWhite");
    whoContainer.classList.remove("changeBgColorToWhite");
    closeBtnWhere.src = emptyIcon;
    closeBtnCheckIn.src = emptyIcon;
    closeBtnCheckOut.src = emptyIcon;
    closeBtnWho.src = emptyIcon;

    whereDropContext.display="none";
    checkInDropContext.display="none";

    //operation for all switches
    navContainer.backgroundColor = "var(--second-grey-color)";

    switch (option) {
      case "where":
        whereContainer.classList.add("changeBgColorToWhite");
        searchBtn.display = "block";
        closeBtnWhere.src = closeIconToUse;
        whereDropContext.display="block";

        break;

      case "check-in":
        checkInContainer.classList.add("changeBgColorToWhite");
        searchBtn.display = "block";
        closeBtnCheckIn.src = closeIconToUse;
        checkInDropContext.display="block";

        break;

      case "check-out":
        checkOutContainer.classList.add("changeBgColorToWhite");
        searchBtn.display = "block";
        closeBtnCheckOut.src = closeIconToUse;

        break;

      case "who":
        whoContainer.classList.add("changeBgColorToWhite");
        searchBtn.display = "block";
        closeBtnWho.src = closeIconToUse;

        break;

      case "exit":
        navContainer.backgroundColor = "white";
        searchBtn.display = "none";
        whereDropContext.display="none";

        break;
    }
  };

  const setCurrentTown=(place)=>{
      setTown(place);
  }

  const getTownApi= async()=>{
    const respone = await fetch(`https://secure.geonames.org/searchJSON?q=${town}&maxRows=10&username=${import.meta.env.VITE_GEONAME_USERNAME}`);
    //const respone = await fetch(`view-source:http://api.geonames.org/searchJSON?q=${town}&maxRows=10&username=${import.meta.env.VITE_GEONAME_USERNAME}`);
    if(!respone){
      console.log("Geonames api don't work");
      
    }else{
      const json = await respone.json();
      console.log(json.geonames);

      setProposalTowns([]);
      for(town in json.geonames){
        // console.log(town);
        // setProposalTowns([...proposalTowns, {}])
      }

    }
  }

  function checkInDates (){
    
    return(
      <div id="check-in-dates">
        <div id="calendar-container">
          <div id="calendar-left"></div>
          <div id="calendar-right"></div>
        </div>
        <div id="dates-margin">
          <button>Exact dates</button>
          <button>± 1 day</button>
          <button>± 2 days</button>
          <button>± 3 days</button>
          <button>± 7 days</button>
          <button>± 14 days</button>
        </div>
      </div>
    )
  }

  // useEffect(()=>{
  //   getTownApi();
  // },town)

  //after click anywhere navBar will be smalles and all options will return to start state
  document.addEventListener("click", (event) => {
    let navContainer = document.getElementById("big-nav-inputs");

    if (!navContainer.contains(event.target)) {
      handleChoosenOption("exit");
    }
  });


  return (
    <div id="navbar-container">
      <div id="nav-logo">
        <a href="#">
          <img src={Logo} alt="Logo" />
          <p>Rently</p>
        </a>
      </div>
      {bigNav ? (
        <div
          style={{ backgroundColor: "white" }}
          onClick={handleNavBarSize}
          id="big-nav-inputs"
        >
          <div
            onClick={() => handleChoosenOption("where")}
            onMouseOver={() => handleLineShow(1)}
            id="input-form-where"
          >
            <div id="main-of-input">
              <p>Where</p>
              <input
                value={town}
                onChange={(e) => setTown(e.target.value)}
                type="text"
                placeholder="Search destinations"
              />
            </div>
            <img
              onClick={() => {
                setTown("");
              }}
              src={emptyIcon}
              alt="Close-icon"
            />
          </div>
            <div id="where-drop-container">
              <p style={{fontSize: "0.8rem", }}>Suggested destinations</p>
              <ul>
                {
                // town == ""? 
              SuggestedLocalizations.map((localization)=>(
                <li onClick={()=>{setCurrentTown(localization.town); handleChoosenOption("check-in")}}key={localization.id}>
                  <img src={localization.img} alt="" />
                  <div className="localization-content">
                    <p style={{ fontSize: "0.9rem", fontWeight:"bold"}} >{localization.town} {localization.country == null ? null : "," }{localization.country}</p>
                    <p style={{ fontSize: "0.9rem", color: "grey" }}>{localization.description}</p>
                  </div>
                </li>
              )) 
              // : proposalTowns.map((localization)=>(
              //   <li onClick={()=>setCurrentTown(localization.town)} key={localization.id}>
              //     <img src="#" alt="" />
              //     <div className="localization-content">
              //       {/* <p style={{ fontSize: "0.9rem", fontWeight:"bold"}} >{localization.town} {localization.country == null ? null : "," }{localization.country}</p>
              //       <p style={{ fontSize: "0.9rem", color: "grey" }}>{localization.description}</p> */}
              //       <p style={{ fontSize: "0.9rem", fontWeight:"bold" }}>{localization.name}</p>
              //     </div>
              //   </li>
              // ))
              }
              </ul>
            </div>
          {/* <div style={{backgroundColor: state.line1 ? "var(--main-grey-color)" : "rgba(255, 255, 255, 0)"}} className="line"></div> */}
          <div
            onClick={() => handleChoosenOption("check-in")}
            onMouseEnter={() => handleLineShow(2)}
            onMouseLeave={() => handleLineShow(2)}
            id="input-form-check-in"
          >
            <div id="main-of-input">
              <p>Check-in</p>
              <p style={{ fontSize: "0.9rem", color: "grey" }}>Add dates</p>
            </div>
            <img src={emptyIcon} alt="Close-icon" />
            
          </div>
          <div id="check-in-drop-container">
            <div id="type-time">
              <button>Dates</button>
              <button>Months</button>
              <button>Flexible</button>
            </div>
              {checkInContainer}
          </div>
          {/* <div style={{backgroundColor: state.line2 ? "var(--main-grey-color)" : "rgba(255, 255, 255, 0)"}} className="line"></div> */}
          <div
            onClick={() => handleChoosenOption("check-out")}
            onMouseEnter={() => handleLineShow(3)}
            onMouseLeave={() => handleLineShow(3)}
            id="input-form-check-out"
          >
            <div id="main-of-input">
              <p>Check-out</p>
              <p style={{ fontSize: "0.9rem", color: "grey" }}>Add dates</p>
            </div>
            <img src={emptyIcon} alt="Close-icon" />
          </div>
          {/* <div style={{backgroundColor: state.line3 ? "var(--main-grey-color)" : "rgba(255, 255, 255, 0)"}} className="line"></div> */}
          <div
            onClick={() => handleChoosenOption("who")}
            onMouseEnter={() => handleLineShow(4)}
            onMouseLeave={() => handleLineShow(4)}
            id="input-form-who"
          >
            <div id="main-of-input">
              <p>Who</p>
              <p style={{ fontSize: "0.9rem", color: "grey" }}>Add guests</p>
            </div>
            <img src={emptyIcon} alt="Close-icon" />
            <div id="search-btn-container">
              <button id="input-search-btn">
                <img src={searchIcon} alt="Search-icon" />
                <p>Search</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={handleNavBarSize} id="small-nav-inputs">
          <button className="input-btn" style={{ fontWeight: "bold" }}>
            Anywhere
          </button>
          <div className="line"></div>
          <button className="input-btn" style={{ fontWeight: "bold" }}>
            Any week
          </button>
          <div className="line"></div>
          <button className="input-btn">Add guests</button>
          <button id="input-search-btn">
            <img src={searchIcon} alt="Search-icon" />
          </button>
        </div>
      )}
      <div id="nav-details">
        <button className="btn-classic" style={{ fontWeight: "bold" }}>
          Airbnb your home
        </button>
        <button className="btn-classic">
          <img src={earthIcon} alt="Language-icon" />
        </button>
        <button id="user-details">
          <img src={listIcon} alt="List-icon" />
          <img src={profileIcon} alt="Profile-icon" />
        </button>
      </div>
    </div>
  );
}
