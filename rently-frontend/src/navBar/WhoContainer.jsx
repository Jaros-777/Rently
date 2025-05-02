import { useState } from "react";
import "./WhoContainer.scss";
import closeIcon from "../assets/icon-close-black.png";
import GuideDogPicture from "./guide-dog-pic.jpg"

export default function WhoContainer(props) {
  let [peopleCount, setPeopleCount] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const[showPetInfoContainer, setShowPetContainer] = useState(false);
  const[decrementAdultsCount, setDecrementAdultsCount] = useState(true);

  const incrementPeopleCount = (person) => {

    let newCount = {
      ...peopleCount,
      [person]: peopleCount[person] + 1
    }

    if(person != 'adults' && peopleCount.adults == 0){
      newCount={
        ...peopleCount,
        [person]: peopleCount[person] + 1,
        adults: peopleCount.adults + 1
      }
      //setPeopleCount((prev) => ({ ...prev, adults: prev.adults + 1 }));
      setDecrementAdultsCount(false)
    }
    if(person != 'adults' && peopleCount.adults == 1){
      setDecrementAdultsCount(false)
    }

    setPeopleCount(newCount);
    updateCountText(newCount)
  };

  const decrementPeopleCount = (person) => {
    let newCount = {
      ...peopleCount,
    }

    if(person == "adults" &&  peopleCount.adults == 1 && (peopleCount.children != 0 || peopleCount.infants != 0 || peopleCount.pets != 0)){

    }else if (peopleCount[person] != 0 )
    {
       newCount = {
        ...peopleCount,
        [person]: peopleCount[person] - 1
      }

      setPeopleCount(newCount);

      if(newCount.children == 0 && newCount.infants == 0 && newCount.pets == 0)
        setDecrementAdultsCount(true);
    }
    updateCountText(newCount)

  };

  const updateCountText=(newCount)=>{
    let newText ="Add guests"
    if(newCount.adults != 0){
      newText = ''

      if(newCount.adults + newCount.children  == 1){
        newText = newText+ " 1 guest"
      }
      if(newCount.adults + newCount.children  > 1){
        newText = newText+ " " +(newCount.adults + newCount.children )+ " guests"
      }

    if(newCount.infants == 1){
      newText = newText+ " ," +newCount.infants + " infant"
    }
    if(newCount.infants > 1){
      newText = newText+ " ," +newCount.infants + " infants"
    }
    if(newCount.pets == 1){
      newText = newText+ " ," +newCount.pets + " pet"
    }
    if(newCount.pets > 1){
      newText = newText+ " ," +newCount.pets + " pets"
    }
  }
    props.setWhoInputText(newText)
  }
  
  const handlePetInfoWindow = () => {
    if(showPetInfoContainer ==false ){
      setShowPetContainer(true);
      document.body.style.overflow="hidden";
    }else{
      setShowPetContainer(false);
      document.body.style.overflow="";
    }
  }

  return (
    <>
      <div id="who-drop-container">
        <div className="person-category">
          <div className="category-left">
            <p>Adults</p>
            <p>Ages 13 or above</p>
          </div>
          <div className="category-right">
            <button
              onClick={() => {decrementPeopleCount("adults")
              }}
              style={(peopleCount.adults != 0 && decrementAdultsCount == true) || peopleCount.adults > 1? 
                null : {border:"2px solid rgba(128, 128, 128, 0.2)", cursor:"not-allowed"}}
            >
              -
            </button>
            <p>{peopleCount.adults}</p>
            <button
              onClick={() => {
                incrementPeopleCount("adults");
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="person-category">
          <div className="category-left">
            <p>Childres</p>
            <p>Ages 2 - 12</p>
          </div>
          <div className="category-right">
            <button
              onClick={() => {
                decrementPeopleCount("children");
              }}
              style={peopleCount.children != 0 ? 
                null : {border:"2px solid rgba(128, 128, 128, 0.2)", cursor:"not-allowed"}}
            >
              -
            </button>
            <p>{peopleCount.children}</p>
            <button
              onClick={() => {
                incrementPeopleCount("children");
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="person-category">
          <div className="category-left">
            <p>Infants</p>
            <p>Under 2</p>
          </div>
          <div className="category-right">
            <button
              onClick={() => {
                decrementPeopleCount("infants");
              }}
              style={peopleCount.infants != 0 ? 
                null : {border:"2px solid rgba(128, 128, 128, 0.2)", cursor:"not-allowed"}}
            >
              -
            </button>
            <p>{peopleCount.infants}</p>
            <button
              onClick={() => {
                incrementPeopleCount("infants");
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="person-category">
          <div className="category-left">
            <p>Pets</p>
            <p onClick={handlePetInfoWindow}
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Bringing a service animal?
            </p>
          </div>
          <div className="category-right">
            <button
              onClick={() => {
                decrementPeopleCount("pets");
              }}
              style={peopleCount.pets != 0 ? 
                null : {border:"2px solid rgba(128, 128, 128, 0.2)", cursor:"not-allowed"}}
            >
              -
            </button>
            <p>{peopleCount.pets}</p>
            <button
              onClick={() => {
                incrementPeopleCount("pets");
              }}
            >
              +
            </button>
          </div>
        </div>
          
      </div>
      {showPetInfoContainer ? 
      <div id="drop-pets-info">
            <div id="pets-content">
              <button onClick={handlePetInfoWindow}>
                <img src={closeIcon} alt="close-icon" />
              </button>
              <img src={GuideDogPicture} alt="Guide Dog Picture" />
              <span style={{fontSize:"2rem", fontWeight: "bold", cursor:"pointer" }}>Service animals</span>
              <p>
                Service animals aren’t pets, so there’s no need to add them
                here.
              </p>
              <p>
                Traveling with an emotional support animal? Check out our {" "}
                <span
                  style={{ textDecoration: "underline", fontWeight: "bold", cursor:"pointer" }}
                >
                  accessibility policy
                </span>
                .
              </p>
            </div>
          </div>
          : null}
    </>
  );
}
