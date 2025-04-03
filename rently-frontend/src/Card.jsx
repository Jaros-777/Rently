import "./Card.scss"

export default function Card(props) {
  return (
    <>
      <div id="card-container">
        <img src={props.img} alt="" />
        <p>{props.town}, {props.country} </p>
        <p className="grey-text">Hosted by {props.owner}</p>
        <p className="grey-text">Apr 7-12</p>
        <p><span style={{fontWeight:"bold"}} >{props.price}</span> zł night</p>
      </div>
    </>
  );
}
