import React from "react";
interface GuessingPunchlineInpuProps {
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
  punchline: string;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setFeedbackMsg: React.Dispatch<React.SetStateAction<string>>;
}
export const GuessingPunchlineInput: React.FC<GuessingPunchlineInpuProps> = ({
  setGameState,
  punchline,
  lives,
  setLives,
  setFeedbackMsg,
}) => {
  const [punchlineGuess, setPunchlineGuess] = React.useState<string>("");
  const [punchlineAnswer] = React.useState<string>(punchline);

  const handleInputChange = (value: string) => {
    const newPunchlineGuess = value; // toUppercase is handled on change
    setPunchlineGuess(newPunchlineGuess);
  };

  const evaluatePunchlineGuess = () => {
    const punchlineGuessFmtd = punchlineGuess.replace(/[^a-zA-Z0-9]/g, "");
    if (punchlineGuessFmtd === punchlineAnswer) {
      setFeedbackMsg(""); // clear feedback message because no need to see it after winning
      setGameState("completeWin");
    } else {
      setLives(lives - 1);
      setFeedbackMsg("Incorrect Guess of Punchline");
    }
  };

  const submitButtonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div className="flex flex-col text-center items-center font-teko-semibold">
      <button
        className="m-1 p-1 border-2 border-gray-600 text-center text-lg w-fit rounded-md shadow-md"
        onClick={() => {
          setGameState("guessingLetter");
        }}
      >
        Guess Letter
      </button>
      <h2 className="text-xl">Guess the Punchline</h2>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={punchlineGuess}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            handleInputChange(value);
          }}
          className="m-1 p-1 border-2 border-gray-600 text-center rounded-md w-96 shadow-md"
        />
        <button
          ref={submitButtonRef}
          onClick={() => evaluatePunchlineGuess()}
          className="m-1 p-1 border-2 border-gray-600 text-center text-lg w-fit rounded-md shadow-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
