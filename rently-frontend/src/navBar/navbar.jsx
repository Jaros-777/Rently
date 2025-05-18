import earthIcon from "../assets/earth-icon.png";
import listIcon from "../assets/icon-list.png";
import profileIcon from "../assets/profile-icon.png";
import searchIcon from "../assets/search-icon.png";
import closeIcon from "../assets/icon-close-black.png";
import emptyIcon from "../assets/empty.png";
import Logo from "../assets/Rently-logo-red.png";
import localizationIcon from "../assets/icon-localization.png";
import "./navbar.scss";
import { useEffect, useReducer, useRef, useState } from "react";
import { initialLine, reducerLine } from "./lineReducer.js";
import { SuggestedLocalizations } from "../DataBase/SuggestedLocalizations.js";
import CheckInContainer from "./CheckInContainer.jsx";
import WhoContainer from "./WhoContainer.jsx";
import Filters from "./Filters.jsx";
import IconRing from "../assets/icon-ring-belt.png"
import IconBalloon from "../assets/icon-air-balloon.png"
import IconHome from "../assets/icon-home.png"

export default function NavBar() {
  const [bigNav, setBigNav] = useState(false);
  const [state, dispatch] = useReducer(reducerLine, initialLine);
  let [town, setTown] = useState("");
  const [proposalTowns, setProposalTowns] = useState([]);
  const [activeTab, setActivTab] = useState("");
  const [checkInDate, setCheckInDate] = useState("Add dates");
  const [checkOutDate, setCheckOutDate] = useState("Add dates");
  const [whoInputText, setWhoInputText] = useState("Add guests");
  const [showWhereContainer, setShowWhereContainer] = useState(false);
  const [showCheckContainer, setShowCheckContainer] = useState(false);
  const [showWhoContainer, setShowWhoContainer] = useState(false);
  const [currentPageOption, setCurrentPageOption] = useState(IconHome)

  // const bigNavRef = useRef(null);
  // const smallNavRef = useRef(null);
  // const navContentRef = useRef(null);

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

    //let whereDropContext = document.getElementById("where-drop-container").style;
    //let checkInDropContext = document.getElementById("check-in-drop-container").style;
    //let whoDropContext = document.getElementById("who-drop-container").style;

    //reset
    whereContainer.classList.remove("changeBgColorToWhite");
    checkInContainer.classList.remove("changeBgColorToWhite");
    checkOutContainer.classList.remove("changeBgColorToWhite");
    whoContainer.classList.remove("changeBgColorToWhite");
    closeBtnWhere.src = emptyIcon;
    closeBtnCheckIn.src = emptyIcon;
    closeBtnCheckOut.src = emptyIcon;
    closeBtnWho.src = emptyIcon;

    setShowWhereContainer(false);
    setShowCheckContainer(false);
    setShowWhoContainer(false);

    //whereDropContext.display="none";
    //checkInDropContext.display="none";
    //whoDropContext.display="none";

    //operation for all switches
    navContainer.backgroundColor = "var(--second-grey-color)";

    switch (option) {
      case "where":
        whereContainer.classList.add("changeBgColorToWhite");
        searchBtn.display = "block";
        closeBtnWhere.src = closeIconToUse;
        //whereDropContext.display="block";
        setShowWhereContainer(true);

        break;

      case "check-in":
        checkInContainer.classList.add("changeBgColorToWhite");
        searchBtn.display = "block";
        closeBtnCheckIn.src = closeIconToUse;
        //checkInDropContext.display="flex";
        setActivTab("check-in");
        setShowCheckContainer(true);

        break;

      case "check-out":
        checkOutContainer.classList.add("changeBgColorToWhite");
        searchBtn.display = "block";
        closeBtnCheckOut.src = closeIconToUse;
        //checkInDropContext.display="flex";
        setActivTab("check-out");
        setShowCheckContainer(true);

        break;

      case "who":
        whoContainer.classList.add("changeBgColorToWhite");
        searchBtn.display = "block";
        closeBtnWho.src = closeIconToUse;
        //whoDropContext.display="flex";
        setShowWhoContainer(true);

        break;

      case "exit":
        navContainer.backgroundColor = "white";
        searchBtn.display = "none";
        //whereDropContext.display="none";
        // setShowWhereContainer(false);
        // setShowCheckContainer(false);
        // setShowWhoContainer(false);
        break;
    }
  };

  const setCurrentTown = (place) => {
    setTown(place);
  };

  const getTownApi = async () => {
    const respone = await fetch(
      `https://secure.geonames.org/searchJSON?q=${town}&maxRows=10&username=${
        import.meta.env.VITE_GEONAME_USERNAME
      }`
    );
    //const respone = await fetch(`view-source:http://api.geonames.org/searchJSON?q=${town}&maxRows=10&username=${import.meta.env.VITE_GEONAME_USERNAME}`);
    if (!respone) {
      console.log("Geonames api don't work");
    } else {
      const json = await respone.json();
      //console.log(json.geonames);

      setProposalTowns([]);
      for (let i in json.geonames) {
        //console.log(json.geonames[i].name);
        setProposalTowns((prev) => [...prev, json.geonames[i].name]);
      }
    }
  };
  useEffect(() => {
    getTownApi();
  }, [town]);


  
  const changeNavHeight=()=>{
    const navHeight = document.getElementById("nav-content");
   
      const onTop = window.scrollY === 0;

      setBigNav(onTop);
      if (navHeight) {
        navHeight.classList.toggle("scale-100", onTop);
        navHeight.classList.toggle("scale-90", !onTop);
        navHeight.style.height = onTop ? "11rem" : "4rem";
      }
    
  }

  // watch over navbar size
  useEffect(() => {

    window.addEventListener("scroll", changeNavHeight);

    // Wywołaj od razu na wypadek, gdyby użytkownik był już scrolnięty
    changeNavHeight();

    return () => {
      window.removeEventListener("scroll", changeNavHeight);
    };
  }, []);

  useEffect(() => {
    if (checkInDate != "Add dates") {
      handleChoosenOption("check-out");
    }
  }, [checkInDate]);

  //after click anywhere navBar will be smalles and all options will return to start state
  document.addEventListener("click", (event) => {
    let navContainer = document.getElementById("big-nav-inputs");

    if (!navContainer.contains(event.target)) {
      handleChoosenOption("exit");
    }
  });

  return (
    <div id="navbar-container">
      <div id="nav-content">
        <div id="nav-logo">
          <a href="#">
            <img src={Logo} alt="Logo" />
            <p style={{color:"red"}}>Rently</p>
          </a>
        </div>
        {bigNav ? (
          <div id="big-nav-container">
            <div id="main-option">
              <div style={currentPageOption == IconHome? {borderBottom: "3px solid black"} : null} onClick={()=>setCurrentPageOption(IconHome)} className="option">
                <img src={IconHome} alt="" />
                <button> Homes</button>
              </div>
              <div style={currentPageOption == IconBalloon? {borderBottom: "3px solid black"} : null} onClick={()=>setCurrentPageOption(IconBalloon)} className="option">
                <img src={IconBalloon} alt="" />
                <button> Experiences</button>
              </div>
              <div style={currentPageOption == IconRing? {borderBottom: "3px solid black"} : null} onClick={()=>setCurrentPageOption(IconRing)} className="option">
                <img src={IconRing} alt="" />
                <button> Services</button>
              </div>
            </div>
            <div style={{ backgroundColor: "white" }} id="big-nav-inputs">
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
              {showWhereContainer ? (
                <div id="where-drop-container">
                  <div id="where-drop-content">
                    <p style={{ fontSize: "0.8rem" }}>Suggested destinations</p>
                    <ul>
                      {town == ""
                        ? SuggestedLocalizations.map((localization, id) => (
                            <li
                              onClick={() => {
                                setCurrentTown(localization.town);
                                handleChoosenOption("check-in");
                              }}
                              key={id}
                            >
                              <img src={localization.img} alt="" />
                              <div className="localization-content">
                                <p
                                  style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {localization.town}{" "}
                                  {localization.country == null ? null : ","}
                                  {localization.country}
                                </p>
                                <p
                                  style={{ fontSize: "0.9rem", color: "grey" }}
                                >
                                  {localization.description}
                                </p>
                              </div>
                            </li>
                          ))
                        : proposalTowns.map((localization, id) => (
                            <li
                              onClick={() => {
                                setCurrentTown(localization);
                                handleChoosenOption("check-in");
                              }}
                              key={id}
                            >
                              <img
                                src={localizationIcon}
                                alt="Localization Icon"
                              />
                              <div className="localization-content">
                                {/* <p style={{ fontSize: "0.9rem", fontWeight:"bold"}} >{localization.town} {localization.country == null ? null : "," }{localization.country}</p>
                    <p style={{ fontSize: "0.9rem", color: "grey" }}>{localization.description}</p> */}
                                <p
                                  style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {localization}
                                </p>
                              </div>
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              ) : null}
              {/* <div style={{backgroundColor: state.line1 ? "var(--main-grey-color)" : "rgba(255, 255, 255, 0)"}} className="line"></div> */}
              <div
                onClick={() => handleChoosenOption("check-in")}
                onMouseEnter={() => handleLineShow(2)}
                onMouseLeave={() => handleLineShow(2)}
                id="input-form-check-in"
              >
                <div id="main-of-input">
                  <p>Check-in</p>
                  <p style={{ fontSize: "0.8rem", color: "grey" }}>
                    {checkInDate == "Add dates"
                      ? checkInDate
                      : checkInDate.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                  </p>
                </div>
                <img
                  onClick={() => setCheckInDate("Add dates")}
                  src={emptyIcon}
                  alt="Close-icon"
                />
              </div>
              {showCheckContainer ? (
                <CheckInContainer
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  setCheckInDate={setCheckInDate}
                  setCheckOutDate={setCheckOutDate}
                  activeTab={activeTab}
                ></CheckInContainer>
              ) : null}
              {/* <div style={{backgroundColor: state.line2 ? "var(--main-grey-color)" : "rgba(255, 255, 255, 0)"}} className="line"></div> */}
              <div
                onClick={() => handleChoosenOption("check-out")}
                onMouseEnter={() => handleLineShow(3)}
                onMouseLeave={() => handleLineShow(3)}
                id="input-form-check-out"
              >
                <div id="main-of-input">
                  <p>Check-out</p>
                  <p style={{ fontSize: "0.8rem", color: "grey" }}>
                    {checkOutDate == "Add dates"
                      ? checkOutDate
                      : checkOutDate.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                  </p>
                </div>
                <img
                  onClick={() => setCheckOutDate("Add dates")}
                  src={emptyIcon}
                  alt="Close-icon"
                />
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
                  <p style={{ fontSize: "0.8rem", color: "grey" }}>
                    {whoInputText}
                  </p>
                </div>
                <img src={emptyIcon} alt="Close-icon" />
                <div id="search-btn-container">
                  <button id="input-search-btn">
                    <img src={searchIcon} alt="Search-icon" />
                    <p>Search</p>
                  </button>
                </div>
              </div>
              {showWhoContainer ? (
                <WhoContainer
                  whoInputText={whoInputText}
                  setWhoInputText={setWhoInputText}
                ></WhoContainer>
              ) : null}
            </div>
          </div>
        ) : (
          <div onClick={()=>changeNavHeight()} id="small-nav-inputs">
            <button className="input-btn" style={{ fontWeight: "bold" }}>
              <img src={currentPageOption} alt="" />
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
            Become a host
          </button>
          <button className="btn-classic">
            <img src={earthIcon} alt="Language-icon" />
          </button>
          <button id="user-details">
            <img src={listIcon} alt="List-icon" />
          </button>
        </div>
      </div>
      {/* <Filters /> */}
    </div>
  );
}
