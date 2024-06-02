import React, { useState, useEffect, ChangeEvent } from "react";
import "../css/GuessNumberGame.css";
import Popup from "../UI/Popup";
import { Player } from "../model/Player";

const GuessNumberGame: React.FC = () => {
  
  const [answer, setAnswer] = useState<number>(0);
  const [noOfGuesses, setNoOfGuesses] = useState<number>(0);
  const [guessedNumsArr, setGuessedNumsArr] = useState<number[]>([]);
  const [userGuess, setUserGuess] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  let interval:number = parseInt(localStorage.getItem('invervalValue') || '100')
  let difficulty =  localStorage.getItem('difficulty') || 'Normal';
  let limite:number = Math.ceil(Math.log2(interval)) + 1
  
  const setLimite = ()=>{
    if (difficulty === 'Normal') {
      limite =  Math.ceil(Math.log2(interval)) + 1
    }else if(difficulty === 'Difficile'){
      limite = Math.ceil(((Math.log2(interval) + 1) + ((Math.log2(interval)/2) + 1))/2)
    }else{
      limite =  Math.ceil((Math.log2(interval))/2) + 1
    }
  }
  setLimite();
  console.log(limite)
  const play = () => {
    
    const player:Player = new Player(userName,difficulty,0)
    const guess = parseInt(userGuess, 10);
     
    if (isNaN(guess) || guess < 1 || guess > interval) {
      alert("Entrez un nombre valide dans l'intervalle.");
      return;
    }
    
    const newGuessedNumsArr = [...guessedNumsArr, guess];
    setGuessedNumsArr(newGuessedNumsArr);
    setNoOfGuesses(noOfGuesses + 1);
    if (guess !== answer) {
      if (noOfGuesses === limite) {
        setHint(`Désolé, vous avez perdu ! Le nombre était ${answer}.`);
        setGameOver(true);
      } else {
        if (guess < answer) {
          setHint("Vous êtes en dessous de la réponse");
        } else {
          setHint("Vous êtes au-dessus de la réponse");
        }
        setTimeout(() => {
          setHintClass("error");
        }, 10);
      }
    } else {
      setHint(
        `Bravo ! Le nombre était ${answer}. Vous l'avez trouvé en ${noOfGuesses + 1} essai(s).`
      );
      player.score = noOfGuesses + 1
      addPlayer(player)
      
      setGameOver(true);
      setHintClass("success");
    }
  };
  
  const handleInputChange = (text: string) => {
    setUserName(text);
  };
  
  function addPlayer(newPlayer: Player) {
    const playersData = JSON.parse(localStorage.getItem('players') || '{"players":[]}');

    const existingPlayerIndex = playersData.players.findIndex((player: Player) =>
        player.name === newPlayer.name && player.difficulty === newPlayer.difficulty);

    if (existingPlayerIndex !== -1) {
        playersData.players[existingPlayerIndex].score = newPlayer.score;
    } else {
      
        playersData.players.push(newPlayer);
    }

    localStorage.setItem('players', JSON.stringify(playersData));
}

  

  const restartGame = () => {
    setAnswer(Math.floor(Math.random() * interval) + 1);
    setNoOfGuesses(0);
    setGuessedNumsArr([]);
    setUserGuess("");
    setHint("");
    setGameOver(false);
  };

  useEffect(() => {
    restartGame();
  }, []);

  const setHintClass = (className: string) => {
    const hintElement = document.getElementById("hint");
    if (hintElement) {
      hintElement.classList.remove("error", "success");
      hintElement.classList.add(className);
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return showPopup ? (
    <Popup onClose={handleClose} onInputChange={handleInputChange}>
      <p style={{ margin: 0 }}>Entrer votre nom: </p>
    </Popup>
  ) : (
    <div className="container">
      <div id="game">
        <h3>
          Hey {userName}! Peux-tu deviner mon nombre ?<br />
          (1-{interval})
        </h3>
        <div className="input-wrapper">
          <input
            type="number"
            placeholder="00"
            value={userGuess}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserGuess(e.target.value)
            }
          />
          <button onClick={play}>Guess</button>
        </div>
        <p id="no-of-guesses">Nombre d'essais: {noOfGuesses}</p>
        <p id="guessed-nums">Vos propositions: {guessedNumsArr.join(", ")}</p>
      </div>
      <button
        id="restart"
        onClick={restartGame}
        style={{ display: gameOver ? "block" : "none" }}
      >
        Nouvelle Partie
      </button>
      <div className="result">
        <div id="hint">{hint}</div>
      </div>
    </div>
  );
};

export default GuessNumberGame;
