import { useEffect } from "react";
import "./App.css";
import React from "react";
import { GameContainer } from "./components/GameContainer";
import { Joke } from "./interfaces/Joke";
function App() {
  const [joke, setJoke] = React.useState<Joke>({
    setup: "",
    punchline: "",
    formattedPunchline: "",
  });
  const [gameState, setGameState] = React.useState<
    | "loading"
    | "firstPick"
    | "guessingLetter"
    | "guessingPunchline"
    | "completeWin"
    | "completeLoss"
  >("loading");

  useEffect(() => {
    fetch("https://api.cadegray.dev/joke")
      .then((response) => response.json())
      .then((data) => {
        const jokeBody = data[0];
        setJoke({
          setup: jokeBody.setup,
          punchline: jokeBody.punchline,
          formattedPunchline: jokeBody.formattedPunchline,
        });
        setGameState("firstPick");
      });
  }, []);

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold">Jokedle</h1>
      <h2 className="text-lg font-bold">Guess The Punchline</h2>
      <GameContainer
        gameState={gameState}
        setGameState={setGameState}
        joke={joke}
      />
    </div>
  );
}

export default App;
