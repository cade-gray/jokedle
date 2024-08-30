import { useEffect } from "react";
import "./App.css";
import React from "react";
import { GameContainer } from "./components/GameContainer";
import { Joke } from "./interfaces/Joke";
import { HowToContainer } from "./components/HowToContainer";
import { JokeListContainer } from "./components/JokeListContainer";
import { JokeSubmissionContainer } from "./components/JokeSubmissionContainer";
function App() {
  const [joke, setJoke] = React.useState<Joke>({
    jokeid: 0,
    setup: "",
    punchline: "",
    formattedPunchline: "",
  });
  const [appState, setAppState] = React.useState<
    "loading" | "inGame" | "howTo" | "jokeList" | "jokeSubmission"
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
  const [letters, setLetters] = React.useState<string[]>([]);
  const [lives, setLives] = React.useState<number>(3);
  // Why is punchline here if it is in the joke interface?
  const [punchline, setPunchline] = React.useState<string>("");
  const [feedbackMsg, setFeedbackMsg] = React.useState<string>("");

  useEffect(() => {
    fetch("https://api.cadegray.dev/joke")
      .then((response) => response.json())
      .then((data) => {
        const jokeBody = data[0];
        setJoke({
          jokeid: jokeBody.jokeId,
          setup: jokeBody.setup,
          punchline: jokeBody.punchline,
          formattedPunchline: jokeBody.formattedPunchline,
        });
        setGameState("firstPick");
        setAppState("inGame");
      });
  }, []);

  const headerButtonClasses =
    "m-1 p-1 border-2 border-gray-600 text-center text-lg w-20 rounded-md shadow-md";

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto font-teko-semibold">
      <h1 className="text-4xl font-climatecrisis-regular">Jokedle</h1>
      <h2 className="text-lg">Guess The Punchline</h2>
      <div className="flex justify-between">
        <button
          className={headerButtonClasses}
          onClick={() => setAppState("inGame")}
        >
          Play
        </button>
        <button
          className={headerButtonClasses}
          onClick={() => setAppState("howTo")}
        >
          How To Play
        </button>
        <button
          className={headerButtonClasses}
          onClick={() => setAppState("jokeList")}
        >
          Joke List
        </button>
        <button
          className={headerButtonClasses}
          onClick={() => setAppState("jokeSubmission")}
        >
          Submit A Joke
        </button>
      </div>
      {appState === "loading" ? (
        <div className="text-lg text-center">Loading...</div>
      ) : appState === "inGame" ? (
        <GameContainer
          gameState={gameState}
          setGameState={setGameState}
          joke={joke}
          letters={letters}
          setLetters={setLetters}
          lives={lives}
          setLives={setLives}
          punchline={punchline}
          setPunchline={setPunchline}
          feedbackMsg={feedbackMsg}
          setFeedbackMsg={setFeedbackMsg}
        />
      ) : appState === "howTo" ? (
        <HowToContainer/>
      ) : appState === "jokeList" ? (
        <JokeListContainer
          setGameState={setGameState}
          setJoke={setJoke}
          setLetters={setLetters}
          setLives={setLives}
          setFeedbackMsg={setFeedbackMsg}
          setAppState={setAppState}
        />
      ) : appState === "jokeSubmission" ? (
        <JokeSubmissionContainer />
      ): null}
      <div className="text-center">
        <p>
          Developed by{" "}
          <a className="text-[#4ac4da]" href="https://cadegray.dev">
            Cade Gray
          </a>
        </p>
        <p>
          <a
            className="text-[#4ac4da]"
            href="https://github.com/cade-gray/jokedle-web"
          >
            Source Code
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
