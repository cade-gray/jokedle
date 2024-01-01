import React from "react";
//import { useContext } from "react";
//import { LettersContext } from "../contexts/LettersContext";
interface FirstPickInputProps {
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
}
export const FirstPickInput: React.FC<FirstPickInputProps> = ({
  //gameState,
  setGameState,
  //letters,
  setLetters,
}) => {
  const [firstPick, setFirstPick] = React.useState<string[]>(Array(5).fill(""));
  //const { letters } = useContext(LettersContext);
  const handleInputChange = (index: number, value: string) => {
    const newFirstPick = [...firstPick];
    newFirstPick[index] = value;
    setFirstPick(newFirstPick);
  };

  return (
    <div className="flex flex-col text-center items-center">
      <h2 className="text-xl">First Pick Input</h2>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={firstPick[i]}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[a-zA-Z]$/.test(value)) {
                handleInputChange(i, value);
              }
            }}
            className="m-1 p-1 border-2 border-gray-300 w-10 text-center"
          />
        ))}
      </div>
      <button
        className="m-1 p-1 border-2 border-gray-300 text-center text-lg w-fit"
        onClick={() => {
          console.log("First Pick: " + firstPick);
          setLetters(firstPick);
          setGameState("guessingLetter");
        }}
      >
        Submit
      </button>
    </div>
  );
};
