import { useEffect, useState } from 'react';
import './App.css';
import ClowCard from './components/ClowCard';
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
    <h1>Memory Game</h1>
    {
      cards.length ? <>
      <button
        className='reset'
        onClick={resetGame}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
        </svg>
      </button>
      <section className='game-section'>
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
      </> : <button onClick={ startGame } className='start'>Start Game</button>
    }
    </section>
  );
}

export default App;
