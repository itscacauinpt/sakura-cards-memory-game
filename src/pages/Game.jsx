import propTypes from 'prop-types';

import Button from '../components/Button';
import ClowCard from '../components/ClowCard';

function Game({
  cards, resetGame, chooseCard, cardOne, cardTwo
  }) {
  return (
    <section className='game-section'>
      <Button onClickGame={resetGame} />
      <div className='game-block'>
        {
          cards.map((card, key) => {
            return <ClowCard
              key={key}
              chooseCard={chooseCard}
              flipped={card === cardOne || card === cardTwo || card.matched}
              card={card}
            />
          })
        }
      </div>
    </section>
  );
}

Game.propTypes = {
  cards: propTypes.string,
  cardOne: propTypes.string,
  cardTwo: propTypes.string,
  flipped: propTypes.bool,
  chooseCard: propTypes.func,
  resetGame: propTypes.func,
}.isRequired

export default Game;
