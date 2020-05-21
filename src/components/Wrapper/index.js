import React, { useState } from 'react';
import CardContainer from '../CardContainer';
import Guide from '../Guide';
import images from '../../imagesUrl.json';
import _shuffle from 'lodash.shuffle';
import './style.css';

const Wrapper = () => {
  const [imagesList, updateImagesList] = useState(_shuffle(images));
  const [score, updateScore] = useState(0);

  const handleClick = (isClicked, key) => {
    if (!isClicked) {
      let updatedStateCards = imagesList.map((card) => {
        if (card.key === key) {
          card.isActive = true;
          return card;
        } else {
          return card;
        }
      });
      updateImagesList(updatedStateCards);
      updateScore(score + 1);
    } else {
      let updatedStateCards = imagesList.map((card) => {
        card.isActive = false;
        return card;
      });
      updateScore(updatedStateCards);
      updateScore(0);
    }

    updateImagesList(_shuffle(imagesList));
  };

  return (
    <div className="wrapper">
      <Guide score={score} />
      <CardContainer action={handleClick} list={imagesList} />
    </div>
  );
};

export default Wrapper;
