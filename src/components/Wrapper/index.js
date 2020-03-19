import React, { Component } from "react";
import CardContainer from "../CardContainer";
import Guide from "../Guide";
import images from "../../imagesUrl.json";
import _shuffle from "lodash.shuffle";
import "./style.css";

class Wrapper extends Component {
	state = {
		imagesArray: images,
		score: 0
	};

	componentDidMount() {
		this.setState({
			imagesArray: _shuffle(this.state.imagesArray)
		});
	}

	handleClick = (isClicked, key) => {
		if (!isClicked) {
			let updatedStateCards = this.state.imagesArray.map(card => {
				if (card.key === key) {
					card.isActive = true;
					return card;
				} else {
					return card;
				}
			});
			this.setState({
				imagesArray: updatedStateCards,
				score: this.state.score + 1
			});
		} else {
			let updatedStateCards = this.state.imagesArray.map(card => {
				card.isActive = false;
				return card;
			});
			this.setState({
				imagesArray: updatedStateCards,
				score: 0
			});
		}

		this.setState({
			imagesArray: _shuffle(this.state.imagesArray)
		});
	};

	render() {
		return (
			<div className="wrapper">
				<Guide score={this.state.score} />
				<CardContainer action={this.handleClick} list={this.state.imagesArray} />
			</div>
		);
	}
}

export default Wrapper;
