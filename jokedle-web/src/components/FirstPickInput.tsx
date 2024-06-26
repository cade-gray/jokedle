import React from "react";
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
  setGameState,
  setLetters,
}) => {
  const [firstPick, setFirstPick] = React.useState<string[]>(Array(5).fill(""));
  const submitButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div className="flex flex-col text-center items-center font-teko-semibold">
      <h2 className="text-lg">Pick 5 Letters</h2>
      <p className="text-sm">Limited to 2 vowels (A, E, I, O, U).</p>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={firstPick[i]}
            ref={(el) => (inputRefs.current[i] = el)}
            onKeyDown={(e) => {
              const value = (e.target as HTMLInputElement).value.toUpperCase();
              if (e.key === "Backspace" && value === "" && i > 0) {
                inputRefs.current[i - 1]?.focus();
              }
            }}
            onChange={(e) => {
              const vowels = ["A", "E", "I", "O", "U"];
              const value = e.target.value.toUpperCase();
              const newFirstPick = [...firstPick];
              const vowelCount = newFirstPick.filter((char) =>
                vowels.includes(char)
              ).length;

              if (
                value === "" ||
                (/^[a-zA-Z]$/.test(value) &&
                  !firstPick.includes(value) &&
                  !(vowels.includes(value) && vowelCount >= 2))
              ) {
                newFirstPick[i] = value;
                setFirstPick(newFirstPick);
                if (value !== "" && inputRefs.current[i + 1]) {
                  inputRefs.current[i + 1]?.focus();
                }
                if (i === 4 && value !== "") {
                  submitButtonRef.current?.focus();
                }
              }
            }}
            className="m-1 p-1 border-2 border-gray-600 w-10 text-center rounded-md shadow-md"
          />
        ))}
      </div>
      <button
        ref={submitButtonRef}
        className="m-1 p-1 border-2 border-gray-600 text-center text-lg w-fit rounded-md shadow-md"
        onClick={() => {
          setLetters(firstPick);
          setGameState("guessingLetter");
        }}
      >
        Submit
      </button>
    </div>
  );
};
