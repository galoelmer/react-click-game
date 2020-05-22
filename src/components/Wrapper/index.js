import React, { useState } from 'react';
import CardContainer from '../CardContainer';
import Guide from '../Guide';
import Modal from '../Modal';
import images from '../../imagesUrl.json';
import _shuffle from 'lodash.shuffle';
import './style.css';

const Wrapper = () => {
  const [imagesList, updateImagesList] = useState(_shuffle(images));
  const [score, updateScore] = useState(0);
  const [modal, setModal] = useState(false);
  const [character, setCharacter] = useState('No Name');

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
      if (score + 1 === 12) {
        setModal(true);
        let updatedStateCards = imagesList.map((card) => {
          card.isActive = false;
          return card;
        });
        updateImagesList(updatedStateCards);
      }
    } else {
      setModal(true);
      setCharacter(imagesList.filter((image) => image.key === key)[0].name);
      let updatedStateCards = imagesList.map((card) => {
        card.isActive = false;
        return card;
      });
      updateImagesList(updatedStateCards);
      updateScore(0);
    }
    updateImagesList(_shuffle(imagesList));
  };

  return (
    <div className="wrapper">
      <Guide score={score} />
      <CardContainer action={handleClick} list={imagesList} />
      <Modal
        open={modal}
        setOpen={setModal}
        character={character}
        score={score}
        updateScore={updateScore}
      />
    </div>
  );
};

export default Wrapper;
