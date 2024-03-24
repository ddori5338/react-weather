import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, getCurLoc, btnActive, setBtnActive }) => {
  return (
    <div className="buttons">
      <Button id={"Current Location" === btnActive ? "active" : ""} onClick={() => {
        getCurLoc();
        setBtnActive("Current Location");
      }}>Current Location</Button>

      {cities.map((item, index) => (
        <Button value={index} id={item === btnActive ? "active" : ""} onClick={() => {
            setCity(item);
            setBtnActive(item);
        }}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
