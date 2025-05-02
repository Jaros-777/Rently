import { useState } from "react";
import { FilterData } from "../DataBase/FilterIcons.js";
import "./Filters.scss";
import closeIcon from "../assets/icon-close-black.png";

export default function Filters() {
  const [filterIconData, setFilterIconData] = useState(FilterData);
  const[showFilters, setShowFilters] = useState(true);

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
      <button onClick={()=>showFilters(true)}>Filters</button>
      {showFilters ?
      <div id="drop-filter-container">
        <div id="drop-filter">
          <div id="top">
            <p>Filters</p>
            <img src={closeIcon} alt="Close Icon" />
          </div>
          <div id="filter-content">
            <div id="type">
              <p>Type of place</p>
              <div id="type-content">
                <button>Any type</button>
                <button>Room</button>
                <button>Entire home</button>
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
