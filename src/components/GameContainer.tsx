import React, { useEffect } from "react";
import { FirstPickInput } from "./FirstPickInput";
import { JokeGrid } from "./JokeGrid";
import { Joke } from "../interfaces/Joke";
import { GuessingLetterInput } from "./GuessingLetterInput";

export const GameContainer = ({
  gameState,
  setGameState,
  joke,
}: {
  gameState: string;
  setGameState: React.Dispatch<
    React.SetStateAction<
      | "loading"
      | "firstPick"
      | "guessingLetter"
      | "guessingPunchline"
      | "completeWin"
      | "completeLoss"
    >
  >;
  joke: Joke;
}) => {
  // Letters that have been guessed
  const [letters, setLetters] = React.useState<string[]>([]);
  const [lives, setLives] = React.useState<number>(5);
  const [punchline, setPunchline] = React.useState<string>("");
  const [feedbackMsg, setFeedbackMsg] = React.useState<string>("");

  useEffect(() => {
    setPunchline(joke.punchline.replace(/[^a-zA-Z0-9]/g, "").toUpperCase());
  }, [joke]);
  useEffect(() => {
    const allCharsInLetters = punchline
      .split("")
      .every((char) => letters.includes(char));
    if (allCharsInLetters && gameState !== "loading") {
      setGameState("completeWin");
    }
  }, [punchline, letters, setGameState]);
  // Logic for InputContainer.  Determines which input to show based on gameState.
  const InputContainer = ({
    gameState,
    setGameState,
    letters,
    setLetters,
    punchline,
    lives,
    setLives,
    setFeedbackMsg,
  }: {
    gameState: string;
    setGameState: React.Dispatch<
      React.SetStateAction<
        | "loading"
        | "firstPick"
        | "guessingLetter"
        | "guessingPunchline"
        | "completeWin"
        | "completeLoss"
      >
    >;
    letters: string[];
    setLetters: React.Dispatch<React.SetStateAction<string[]>>;
    punchline: string;
    lives: number;
    setLives: React.Dispatch<React.SetStateAction<number>>;
    setFeedbackMsg: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    if (gameState === "firstPick") {
      return (
        <FirstPickInput
          gameState={gameState}
          setGameState={setGameState}
          letters={letters}
          setLetters={setLetters}
        />
      );
    } else if (gameState === "guessingLetter") {
      return (
        <GuessingLetterInput
          gameState={gameState}
          setGameState={setGameState}
          letters={letters}
          setLetters={setLetters}
          punchline={punchline}
          lives={lives}
          setLives={setLives}
          setFeedbackMsg={setFeedbackMsg}
        />
      );
    } else if (gameState === "guessingPunchline") {
      return <p>Guessing Punchline State</p>;
    } else if (gameState === "completeWin") {
      return (
        <p className="text-2xl font-extrabold text-green-600">
          Nice job! You have solved the punchline!
        </p>
      );
    } else if (gameState === "completeLoss") {
      return <p className="text-2xl font-extrabold text-red-600">Game Over!</p>;
    } else {
      return <div>Game State Error</div>;
    }
  };

  if (gameState === "loading") return <div>Loading Joke of the day...</div>;
  else
    return (
      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl">{joke.setup}</h2>
        <h3 className="text-lg">
          Lives:{" "}
          {Array.from({ length: lives }, (_, i) => (
            <span key={i}>❤️</span>
          ))}
        </h3>
        <JokeGrid
          formattedPunchline={joke.formattedPunchline}
          letters={letters}
          gameState={gameState}
        />
        <div className="flex items-center">
          <p className="text-md font-semibold">{feedbackMsg}</p>
        </div>
        <InputContainer
          gameState={gameState}
          setGameState={setGameState}
          letters={letters}
          setLetters={setLetters}
          punchline={punchline}
          lives={lives}
          setLives={setLives}
          setFeedbackMsg={setFeedbackMsg}
        />
        {/* <div className="flex flex-col items-center">
          <h2 className="text-xl">Debug</h2>
          <div>Game State: {gameState}</div>
          <div>Letters: {letters}</div>
          <div>Punchline: {punchline}</div>
          <div>Lives: {lives}</div>
        </div> */}
      </div>
    );
};
