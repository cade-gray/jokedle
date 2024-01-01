import React from "react";
//import { useContext } from "react";
//import { LettersContext } from "../contexts/LettersContext";
interface GuessingLetterInputProps {
  gameState:
    | "loading"
    | "firstPick"
    | "guessingLetter"
    | "guessingPunchline"
    | "completeWin"
    | "completeLoss";
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
}
export const GuessingLetterInput: React.FC<GuessingLetterInputProps> = ({
  //gameState,
  setGameState,
  letters,
  setLetters,
  punchline,
  lives,
  setLives,
}) => {
  const [letterGuess, setLetterGuess] = React.useState<string[]>(
    Array(1).fill("")
  );
  //const { letters } = useContext(LettersContext);
  const handleInputChange = (value: string[]) => {
    const newLetterGuess = value;

    setLetterGuess(newLetterGuess);
  };

  const checkLetter = (letter: string) => {
    if (punchline.includes(letter)) {
      return true;
    } else {
      setLives(lives - 1);
      //console.log(lives);
      if (lives - 1 === 0) {
        setGameState("completeLoss");
      }
      return false;
    }
  };

  return (
    <div className="flex flex-col text-center">
      <h2 className="text-xl">Guessing Letter Input</h2>
      <div className="flex flex-col items-center">
        <input
          type="text"
          maxLength={1}
          value={letterGuess}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^[a-zA-Z]$/.test(value)) {
              handleInputChange([value]);
            }
          }}
          className="m-1 p-1 border-2 border-gray-300 w-10 text-center"
        />
        <button
          className="m-1 p-1 border-2 border-gray-300 text-center text-lg w-fit"
          onClick={() => {
            console.log("Letter Guess: " + letterGuess);
            console.log(checkLetter(letterGuess[0]));
            // append letterGuess to letters
            setLetters([...letters, ...letterGuess]);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
