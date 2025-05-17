import "./Card.scss"
import { useState } from "react";
import IconHeartOutline from "./assets/icon-heart-outline.png"
import IconHeartFull from "./assets/icon-heart-full.png"

export default function Card(props) {

  const[fav, setFav] = useState(false)

  return (
    <>
      <div id="card-container">
        <img src={props.img} alt="" />
        <p>{props.type} in {props.town} </p>
        <p className="grey-text"> Apr 7-12 Hosted by {props.owner}</p>
        <p className="grey-text">{props.price} zł night ★ {props.rating}</p>
        <div id="addFavourite">
          <img onClick={()=>{fav ? setFav(false) : setFav(true)}} src={fav ? IconHeartFull: IconHeartOutline} alt="" />
        </div>
      </div>
    </>
  );
}
