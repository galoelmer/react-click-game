import React from "react";
import "./style.css";

function Card(props){
		return (
      <div className="card" onClick={props.clickShuffle}>
        <img src={props.image} alt={props.image}/>
      </div>
    )
}

export default Card;
