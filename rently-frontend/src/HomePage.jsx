import NavBar from "./navBar/navbar.jsx";
import Card from "./Card.jsx";
import { HousesData } from "./DataBase/DataBase.js";
import "./HomePage.scss";
import { useEffect, useState } from "react";
import img from "./DataBase/Houses/house2.jpg"

function HomePage() {
  const [houseData, setHouseData] = useState(HousesData);
  const [data, setData] = useState([]);


  const getHouses = async()=>{
    try {
      
      const response = await fetch(import.meta.env.VITE_JSON_Database);
      // console.log(await response.text())
      setData(await response.json());


    } catch (error) {
      throw new Error(error);
    }
  }

   useEffect(()=>{
      getHouses();
   },[])

   if(data.length == 0){
    return <p>Please wait</p>
   }

  return (
    <>
      <NavBar/>
      <div id="home-container">
        <div id="cards-container">
          {data.map((offert) => (
            <Card
              key={offert.id}
              img={offert.img}
              type={offert.type}
              town={offert.town}
              country={offert.country}
              owner={offert.owner}
              price={offert.price}
              rating={offert.rating}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
