import React, { Component } from "react";
import Card from "../Card";
import "./style.css";

class CardContainer extends Component {
	render() {
		return (
			<div className="cards-container">
				{this.props.list.map(obj => (
					<Card className="card" key={obj.key} image={obj.image} clickShuffle={() => this.props.action(obj.isActive, obj.key)} />
				))}
			</div>
		);
	}
}

export default CardContainer;
