import { useState } from "react";
import { FilterData } from "../DataBase/FilterIcons.js";
import "./Filters.scss";
import closeIcon from "../assets/icon-close-black.png";

export default function Filters() {
  const [filterIconData, setFilterIconData] = useState(FilterData);
  const[showFilters, setShowFilters] = useState(true);
  const[filterDetails, setFilterDetails] = useState({
    type:null
})

  const handleFilterDetails = (option, value) =>{
    const newFilters = {
      ...filterDetails,
      [option]:[value]
    }
    console.log(option,value)
    setFilterDetails(newFilters)
  }


  return (
    <div id="filters-container">
      <ul>
        <button>{"<"}</button>
        {filterIconData.map((i) => (
          <li key={i.id}>
            <img src={i.icon} alt="Icon" />
            <p>{i.name}</p>
          </li>
        ))}
        <button>{">"}</button>
      </ul>
      <button onClick={()=>setShowFilters(true)}>Filters</button>
      {showFilters ?
      <div id="drop-filter-container">
        <div id="drop-filter">
          <div id="top">
            <p>Filters</p>
            <img onClick={()=>setShowFilters(false)} src={closeIcon} alt="Close Icon" />
          </div>
          <div id="filter-content">
            <div id="type">
              <h4>Type of place</h4>
              <div id="type-content">
                <button onClick={()=>{handleFilterDetails("type","any-type")}} style={filterDetails.type == "any-type" ? {border:"2px solid black", backgroundColor:"var(--main-grey-color)"} : null} >Any type</button>
                <button onClick={()=>{handleFilterDetails("type","room")}}  style={filterDetails.type == "room" ? {border:"2px solid black", backgroundColor:"var(--main-grey-color)"} : null}>Room</button>
                <button onClick={()=>{handleFilterDetails("type","home")}}  style={filterDetails.type == "home" ? {border:"2px solid black", backgroundColor:"var(--main-grey-color)"} : null}>Entire home</button>
              </div>
            </div>
            <div id="price-range">
                <p>Price range</p>
                <p>Nightly prices including fees and taxes</p>
                <div id="graph">
                    <p>cos tam</p>
                </div>
                <div id="price-btn-container">
                    <div className="price-btn">
                        <p>Minimum</p>
                        <input type="text" />
                    </div>
                    <div className="price-btn">
                        <p>Maximum</p>
                        <input type="text" />
                    </div>
                </div>
                <div id="rooms-container">
                    <p>Rooms and beds</p>
                    <div className="romoms-content">

                    </div>
                </div>
                <div id="amenities-container">
                    <div id="amenities">
                        <button>wifi</button>
                    </div>
                    <div id="show-more">
                        <p>Show more</p>
                        <img src="#" alt="" />
                    </div>
                </div>
            </div>
          </div>
          <div id="bottom">
            <button>Clear all</button>
            <button>Show 1,000+ places</button>
          </div>
        </div>
      </div>
      : null }
    </div>
  );
}
