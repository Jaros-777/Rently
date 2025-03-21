import earthIcon from "../assets/earth-icon.png";
import listIcon from "../assets/icon-list.png";
import profileIcon from "../assets/profile-icon.png";
import searchIcon from "../assets/search-icon.png";
import closeIcon from "../assets/icon-close-black.png";
import Logo from "../assets/Rently-logo.webp";
import "./navbar.scss";
import { useReducer, useState } from "react";
import {initialLine, reducerLine} from "./lineReducer.js";

export default function NavBar() {
  const [bigNav, setBigNav] = useState(true);
  const [state, dispatch] = useReducer(reducerLine, initialLine);

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

  const handleLineShow = (number)=>{
      switch(number){
        case 1:
          state.line1 ? dispatch({type: "Line-1-off"}) : dispatch({type: "Line-1-on"})
        case 2:
          state.line1 ? dispatch({type: "Line-1-off"}) : dispatch({type: "Line-1-on"})
          state.line2 ? dispatch({type: "Line-2-off"}) : dispatch({type: "Line-2-on"})
        case 3:
          state.line2 ? dispatch({type: "Line-2-off"}) : dispatch({type: "Line-2-on"})
          state.line3 ? dispatch({type: "Line-3-off"}) : dispatch({type: "Line-3-on"})
        case 3:
          state.line3 ? dispatch({type: "Line-3-off"}) : dispatch({type: "Line-3-on"})
          
      }
  }

  return (
    <div id="navbar-container">
      <div id="nav-logo">
        <a href="#">
          <img src={Logo} alt="Logo" />
          <p>Rently</p>
        </a>
      </div>
      {bigNav ? (
        <div onClick={handleNavBarSize} id="big-nav-inputs">
          <div onMouseOver={()=>handleLineShow(1)}  id="input-form-where">
            <div id="main-of-input">
              <p>Where</p>
              <input type="text" placeholder="Search destinations" />
            </div>
            <img src={closeIcon} alt="Close-icon" />
          </div>
          <div style={{backgroundColor: state.line1 ? "var(--main-grey-color)" : "rgba(255, 255, 255, 0)"}} className="line"></div>
          <div onMouseEnter={()=>handleLineShow(2)} onMouseLeave={()=>handleLineShow(2)} onClick={handleNavBarSize} id="input-form-check-in">
            <div id="main-of-input">
              <p>Check-in</p>
              <p style={{fontSize: "0.8rem", color:"var(--main-grey-color)"}}>Add dates</p>
            </div>
            <img src={closeIcon} alt="Close-icon" />
          </div>
          <div style={{backgroundColor: state.line2 ? "var(--main-grey-color)" : "rgba(255, 255, 255, 0)"}} className="line"></div>
          <div onMouseEnter={()=>handleLineShow(3)} onMouseLeave={()=>handleLineShow(3)} id="input-form-check-out">
            <div id="main-of-input">
              <p>Check-out</p>
              <p>Add dates</p>
            </div>
            <img src={closeIcon} alt="Close-icon" />
          </div>
          <div style={{backgroundColor: state.line3 ? "var(--main-grey-color)" : "rgba(255, 255, 255, 0)"}} className="line"></div>
          <div onMouseEnter={()=>handleLineShow(4)} onMouseLeave={()=>handleLineShow(4)} id="input-form-who">
            <div id="main-of-input">
              <p>Who</p>
              <p>Add guests</p>
            </div>
            <img src={closeIcon} alt="Close-icon" />
            <button id="input-search-btn">
              <img src={searchIcon} alt="Search-icon" />
              <p>Search</p>
            </button>
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
