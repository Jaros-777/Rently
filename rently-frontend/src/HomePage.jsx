import NavBar from "./navBar/navbar.jsx";
import Card from "./Card.jsx";
import { HousesData } from "./DataBase/DataBase.js";
import "./HomePage.scss";
import { useEffect, useState } from "react";

function HomePage() {
  const [houseData, setHouseData] = useState(HousesData);
  const [test, setTest] = useState("hej");


  const getHouses = async()=>{
    try {
      
      const response = await fetch("http://localhost:8080/api/hello");
      setTest(await response.text());


    } catch (error) {
      throw new Error("Cannot fetch from api");
    }
  }

  // useEffect(()=>{
  //   getHouses();
  // },[])



  return (
    <>
      <NavBar></NavBar>
      <div id="home-container">
        <div id="cards-container">
          {houseData.map((offert) => (
            <Card
              key={offert.id}
              img={offert.img}
              town={offert.town}
              country={offert.country}
              owner={offert.owner}
              price={offert.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
