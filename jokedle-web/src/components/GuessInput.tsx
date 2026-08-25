import React from "react";
import {
  GameState,
  SetFeedback,
  SetGameState,
  isLetter,
  livesLabel,
  toKey,
} from "../interfaces/GameState";

/**
 * One card for both kinds of guess. The old build split these across two
 * screens with a button that swapped between them; a segmented control makes
 * it clear they are two ways of doing the same thing.
 */
export const GuessInput = ({
  gameState,
  setGameState,
  letters,
  setLetters,
  punchline,
  lives,
  setLives,
  setFeedback,
}: {
  gameState: GameState;
  setGameState: SetGameState;
  letters: string[];
  setLetters: React.Dispatch<React.SetStateAction<string[]>>;
  punchline: string;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setFeedback: SetFeedback;
}) => {
  const [letterGuess, setLetterGuess] = React.useState("");
  const [punchlineGuess, setPunchlineGuess] = React.useState("");

  const isLetterMode = gameState !== "guessingPunchline";
  const key = toKey(punchline);

  const loseLife = (text: string) => {
    const remaining = lives - 1;
    setLives(remaining);
    // GameContainer watches `lives` and ends the round at zero, so both kinds
    // of wrong guess run out the same way.
    setFeedback({
      kind: "bad",
      text: remaining > 0 ? `${text} ${livesLabel(remaining)}.` : text,
    });
  };

  const submitLetter = (event: React.FormEvent) => {
    event.preventDefault();
    const guess = letterGuess.toUpperCase();
    if (!isLetter(guess)) return;

    if (letters.includes(guess)) {
      setFeedback({ kind: "bad", text: `You have already tried ${guess}.` });
      return;
    }

    setLetters([...letters, guess]);
    setLetterGuess("");

    if (key.includes(guess)) {
      setFeedback({ kind: "good", text: `${guess} is in the punchline.` });
    } else {
      loseLife(`${guess} is not in the punchline.`);
    }
  };

  const submitPunchline = (event: React.FormEvent) => {
    event.preventDefault();
    if (toKey(punchlineGuess) === "") return;

    if (toKey(punchlineGuess) === key) {
      setPunchlineGuess("");
      setGameState("completeWin");
      setFeedback({ kind: "good", text: "Word for word. Nicely done." });
      return;
    }

    setPunchlineGuess("");
    loseLife("Not this time.");
  };

  return (
    <div className="card flex flex-col gap-4">
      <div className="seg" role="group" aria-label="Guess type">
        <button
          type="button"
          className="seg-btn"
          aria-pressed={isLetterMode}
          onClick={() => setGameState("guessingLetter")}
        >
          One letter
        </button>
        <button
          type="button"
          className="seg-btn"
          aria-pressed={!isLetterMode}
          onClick={() => setGameState("guessingPunchline")}
        >
          Whole punchline
        </button>
      </div>

      {isLetterMode ? (
        <form className="flex flex-wrap items-end gap-[14px]" onSubmit={submitLetter}>
          <div>
            <label className="label" htmlFor="letter-guess">
              Your letter
            </label>
            <input
              id="letter-guess"
              type="text"
              autoComplete="off"
              maxLength={1}
              value={letterGuess}
              onChange={(event) =>
                setLetterGuess(event.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(-1))
              }
              className="field slot"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guess letter
          </button>
          <p className="hint min-w-[220px] flex-1">
            A letter that is not in the punchline costs one life.
          </p>
        </form>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={submitPunchline}>
          <div>
            <label className="label" htmlFor="punchline-guess">
              The whole punchline
            </label>
            <input
              id="punchline-guess"
              type="text"
              autoComplete="off"
              placeholder="Type it out — punctuation and capitals do not matter"
              value={punchlineGuess}
              onChange={(event) => setPunchlineGuess(event.target.value)}
              className="field"
            />
          </div>
          <div className="flex flex-wrap items-center gap-[14px]">
            <button type="submit" className="btn btn-primary">
              Guess punchline
            </button>
            <p className="hint">Get it wrong and it costs one life, same as a letter.</p>
          </div>
        </form>
      )}
    </div>
  );
};
