import React from "react";
import "./style.css";

function Guide(props) {
	return (
		<div className="guide-container">
			<header>
				Lord of the Rings <br />
				Memory Challenge
			</header>
			<section className="instructions">
				<p>Click on an image until all 12 images are clicked, but don't click on any more than once!</p>
			</section>
			<section className="score">
				<h3>
					Images clicked: <span>{props.score}</span>
				</h3>
			</section>
		</div>
	);
}

export default Guide;
