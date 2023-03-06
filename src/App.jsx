import { useEffect, useState } from 'react';
import './App.css';

import Game from './pages/Game';
import clowCards from './clowCards.json';

function App() {

  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);

  const chooseCard = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  }

  const startGame = () => {
    const allCards = [...clowCards, ...clowCards]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));

    setCards(allCards);
  }

  const resetGame = () => {
    setCards(previous => {
      return previous.map((item) => {
        if (item.matched) {
          return { ...item, matched: false }
        }
        return item;
      })
    })

    setCardOne(null);
    setCardTwo(null);

    setTimeout(() => {
      startGame();
    })
  }

  useEffect(() => {
    if (cardOne && cardTwo) {
      if(cardOne.src === cardTwo.src) {
        setCards(previous => {
          return previous.map((item) => {
            if (item.src === cardOne.src) {
              return { ...item, matched: true }
            } else {
              return item;
            }
          })
        })
      }

      setTimeout(() => {
        setCardOne(null);
        setCardTwo(null);
      }, 500)
    }
  }, [cardOne, cardTwo])

  return (
    <section className='start-section'>
    {
      cards.length ? 
      <Game
        cards={cards}
        cardOne={cardOne}
        cardTwo={cardTwo}
        resetGame={resetGame}
        chooseCard={chooseCard}
      /> : <>
      <h1>Memory Game</h1>
      <button onClick={ startGame } className='start'>Start Game</button>
      </>
    }
    </section>
  );
}

export default App;
