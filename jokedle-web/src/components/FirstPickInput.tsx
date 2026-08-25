import React from "react";
import { SetFeedback, SetGameState, VOWELS, isLetter, toKey } from "../interfaces/GameState";

const PICK_COUNT = 5;
const MAX_VOWELS = 2;

export const FirstPickInput = ({
  setGameState,
  setLetters,
  punchline,
  setFeedback,
}: {
  setGameState: SetGameState;
  setLetters: React.Dispatch<React.SetStateAction<string[]>>;
  punchline: string;
  setFeedback: SetFeedback;
}) => {
  const [picks, setPicks] = React.useState<string[]>(Array(PICK_COUNT).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const submitRef = React.useRef<HTMLButtonElement | null>(null);

  const filled = picks.filter(Boolean).length;
  const vowelCount = picks.filter((pick) => VOWELS.includes(pick)).length;

  const handleChange = (index: number, rawValue: string) => {
    const value = rawValue.toUpperCase().slice(-1);

    if (value === "") {
      setPicks(picks.map((pick, i) => (i === index ? "" : pick)));
      return;
    }
    if (!isLetter(value)) return;

    if (picks.includes(value)) {
      setFeedback({ kind: "bad", text: `You have already picked ${value}.` });
      return;
    }

    const otherVowels = picks.filter((pick, i) => i !== index && VOWELS.includes(pick)).length;
    if (VOWELS.includes(value) && otherVowels >= MAX_VOWELS) {
      setFeedback({ kind: "bad", text: "Two vowels is the limit for your opening five." });
      return;
    }

    setFeedback(null);
    setPicks(picks.map((pick, i) => (i === index ? value : pick)));

    if (index === PICK_COUNT - 1) submitRef.current?.focus();
    else inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && event.currentTarget.value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (filled < PICK_COUNT) {
      setFeedback({ kind: "bad", text: "Fill all five boxes to start the round." });
      inputRefs.current[picks.findIndex((pick) => !pick)]?.focus();
      return;
    }

    const key = toKey(punchline);
    const hits = picks.filter((pick) => key.includes(pick)).length;

    setLetters(picks);
    setGameState("guessingLetter");
    setFeedback({
      kind: hits > 0 ? "good" : "bad",
      text:
        hits === 0
          ? "None of those five turned up — no lives lost, though."
          : hits === 1
          ? "One of your five is in there."
          : `${hits} of your five are in there.`,
    });
  };

  return (
    <div className="card flex flex-col gap-[14px]">
      <div>
        <span className="label" id="first-pick-label">
          Start with five free letters
        </span>
        <p className="hint">
          No more than two vowels (A, E, I, O, U). Every match is revealed straight away.
        </p>
      </div>

      <div className="flex gap-2 sm:gap-[10px]" role="group" aria-labelledby="first-pick-label">
        {picks.map((pick, index) => (
          <input
            key={index}
            type="text"
            inputMode="text"
            autoComplete="off"
            maxLength={1}
            value={pick}
            ref={(element) => (inputRefs.current[index] = element)}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            aria-label={`Opening letter ${index + 1} of ${PICK_COUNT}`}
            className="field slot"
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-[14px]">
        <button ref={submitRef} type="button" className="btn btn-primary" onClick={handleSubmit}>
          Reveal my letters
        </button>
        <span className="hint">
          {filled} of {PICK_COUNT} chosen &middot; {vowelCount} of {MAX_VOWELS} vowels used
        </span>
      </div>
    </div>
  );
};
