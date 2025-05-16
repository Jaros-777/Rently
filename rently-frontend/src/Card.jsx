import "./Card.scss"
import IconStar from "./assets/icon-star.png"

export default function Card(props) {
  return (
    <>
      <div id="card-container">
        <img src={props.img} alt="" />
        <p>{props.type} in {props.town} </p>
        <p className="grey-text"> Apr 7-12 Hosted by {props.owner}</p>
        <p className="grey-text">{props.price} zł night ★ {props.rating}</p>
        <div id="addFavourite">
          <img src={IconStar} alt="" />
        </div>
      </div>
    </>
  );
}
