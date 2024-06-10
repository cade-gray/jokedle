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
  const [appState, setAppState] = React.useState<
    | "loading"
    | "inGame"
    | "howTo"
    | "jokeList"
    | "jokeSubmission"
  >("loading");
  // Game state is at app level so the app state can change and the game will remain the same.
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
        setAppState("inGame");
      });
  }, []);

  return (
  <div className="flex flex-col items-center max-w-screen-lg mx-auto">
    <h1 className="text-4xl font-climatecrisis-regular">Jokedle</h1>
    <h2 className="text-lg font-teko-semibold">Guess The Punchline</h2>
    {/* <div className="flex justify-between w-1/2">
      <button
        className="p-2 border border-black rounded"
        onClick={() => setAppState("inGame")}
      >
        Play
      </button>
      <button
        className="p-2 border border-black rounded"
        onClick={() => setAppState("howTo")}
      >
        How To Play
      </button>
      <button
        className="p-2 border border-black rounded"
        onClick={() => setAppState("jokeList")}
      >
        Joke List
      </button>
      <button
        className="p-2 border border-black rounded"
        onClick={() => setAppState("jokeSubmission")}
      >
        Submit A Joke
      </button>
    </div> */}
    {appState === "loading" ? (
      "<LoadingContainer />"
    ) : appState === "inGame" ? (
      <GameContainer
        gameState={gameState}
        setGameState={setGameState}
        joke={joke}
      />
    ) : appState === "howTo" ? (
      "Feature Coming Soon!"
    ) : appState === "jokeList" ? (
      "Feature Coming Soon!"
    ) : (
      "Feature Coming Soon!"
    )}
  </div>
);
}

export default App;
