import { useState } from "react"
import {FilterData} from "../DataBase/FilterIcons.js"
import "./Filters.scss"

export default function Filters(){

    const[filterIconData,setFilterIconData] = useState(FilterData)

    return (
        <div id="filters-container">
            <ul>
                <button>{"<"}</button>
                {filterIconData.map((i)=>(
                    <li key={i.id}>
                        <img src={i.icon} alt="Icon" />
                        <p>{i.name}</p>
                    </li>
                ))}
                <button>{">"}</button>
            </ul>
            <button>Filters</button>
        </div>
    )
}