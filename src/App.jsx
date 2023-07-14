import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard.jsx";
import bear from "./image/bear.png";
import cow from "./image/cow.png";
import elephant from "./image/elephant.png";
import kangaroo from "./image/kangaroo.png";
import mouse from "./image/mouse.png";
import snail from "./image/snail.png";
import squirrel from "./image/squirrel.png";
import zebra from "./image/zebra.png";
import "./index.css";

const cardImages = [
  { img: bear },
  { img: cow },
  { img: elephant },
  { img: kangaroo },
  { img: mouse },
  { img: snail },
  { img: squirrel },
  { img: zebra },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        img: card.img,
        id: Math.random(),
        matched: card.matched,
      }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      new Promise((res) => {
        setTimeout(res, 300);
      }).then(() => {
        if (choiceOne.img === choiceTwo.img) {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.img === choiceOne.img) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 600);
        }
      });
    }
  }, [choiceOne, choiceTwo]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App  h-[100vh] w-[100%] mx-auto">
      <h1 className="flex justify-center items-cener text-[2.5rem] mt-3 text-lavender ">
        Find a pair
      </h1>
      <div className="flex justify-center items-center ">
        <button
          onClick={shuffleCards}
          className="  border-[2px] rounded-[10px] bg-none cursor-pointer border-white text-black  bg-white w-[150px] mt-[30px] hover:bg-lavender"
        >
          New game
        </button>
      </div>
      <div className="mt-[80px] ml-[750px] grid grid-cols-4 gap-2  w-[400px] h-[400px]">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="ml-[750px] mt-[10px] text-black text-[25px]">
        Turns: {turns}
      </p>
    </div>
  );
}
export default App;
