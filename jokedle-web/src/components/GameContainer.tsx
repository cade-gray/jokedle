import React from "react";
import { Joke } from "../interfaces/Joke";
import {
  Feedback,
  GameState,
  SetFeedback,
  SetGameState,
  livesLabel,
  toKey,
} from "../interfaces/GameState";
import { FirstPickInput } from "./FirstPickInput";
import { GameSkeleton } from "./GameSkeleton";
import { GuessInput } from "./GuessInput";
import { Lives } from "./Lives";
import { PunchlineBoard } from "./PunchlineBoard";
import { AlertIcon, CheckIcon, CrossIcon } from "./icons";

export const GameContainer = ({
  gameState,
  setGameState,
  joke,
  letters,
  setLetters,
  lives,
  setLives,
  feedback,
  setFeedback,
}: {
  gameState: GameState;
  setGameState: SetGameState;
  joke: Joke;
  letters: string[];
  setLetters: React.Dispatch<React.SetStateAction<string[]>>;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  feedback: Feedback | null;
  setFeedback: SetFeedback;
}) => {
  const key = React.useMemo(() => toKey(joke.punchline), [joke.punchline]);

  // Won: every letter in the punchline is showing.
  React.useEffect(() => {
    if (key === "") return;
    if (gameState !== "guessingLetter" && gameState !== "guessingPunchline") return;
    if (key.split("").every((char) => letters.includes(char))) {
      setGameState("completeWin");
    }
  }, [key, letters, gameState, setGameState]);

  // Lost: out of lives. Both kinds of wrong guess just decrement, so this is
  // the single place the round ends — the punchline guess used to be able to
  // take the last life without ending anything.
  React.useEffect(() => {
    if (lives > 0 || gameState === "completeWin" || gameState === "completeLoss") return;
    setGameState("completeLoss");
  }, [lives, gameState, setGameState]);

  const playAgain = () => {
    setLetters([]);
    setLives(3);
    setFeedback(null);
    setGameState("firstPick");
  };

  if (gameState === "loading") return <GameSkeleton />;

  return (
    <div className="flex flex-col gap-5">
      <div className="card [animation:rise-in_340ms_cubic-bezier(0.2,0.7,0.3,1)_both]">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-head text-base font-semibold uppercase tracking-[0.12em] text-brand-ink">
            Joke No. {joke.jokeId}
          </span>
          <Lives lives={lives} />
        </div>
        <h2 className="mt-[10px] font-head text-[26px] font-medium leading-tight text-ink [text-wrap:pretty] sm:text-[34px]">
          {joke.setup}
        </h2>
      </div>

      <PunchlineBoard punchline={joke.punchline} letters={letters} gameState={gameState} />

      {letters.length > 0 && (
        <div>
          <span className="label">Letters you have tried</span>
          <div className="flex flex-wrap gap-[6px]">
            {letters.map((letter, index) => {
              const isHit = key.includes(letter);
              return (
                <span key={`${letter}-${index}`} className={isHit ? "chip chip-hit" : "chip chip-miss"}>
                  <span aria-hidden="true">{letter}</span>
                  <span className="sr-only">
                    {letter}, {isHit ? "in the punchline" : "not in the punchline"}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="min-h-[30px]" role="status" aria-live="polite">
        {feedback && (
          <p
            className={`flex items-center gap-[9px] text-[15px] font-medium [animation:pop-in_240ms_cubic-bezier(0.2,0.8,0.25,1)_both] ${
              feedback.kind === "good" ? "text-good-ink" : "text-bad-ink"
            }`}
          >
            {feedback.kind === "good" ? <CheckIcon /> : <CrossIcon />}
            <span>{feedback.text}</span>
          </p>
        )}
      </div>

      {gameState === "firstPick" && (
        <FirstPickInput
          setGameState={setGameState}
          setLetters={setLetters}
          punchline={joke.punchline}
          setFeedback={setFeedback}
        />
      )}

      {(gameState === "guessingLetter" || gameState === "guessingPunchline") && (
        <GuessInput
          gameState={gameState}
          setGameState={setGameState}
          letters={letters}
          setLetters={setLetters}
          punchline={joke.punchline}
          lives={lives}
          setLives={setLives}
          setFeedback={setFeedback}
        />
      )}

      {gameState === "completeWin" && (
        <div className="card">
          <div className="flex flex-col items-center gap-[14px] text-center">
            <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full border border-good bg-good-soft text-good-ink [animation:trophy-in_480ms_cubic-bezier(0.2,0.85,0.25,1)_both]">
              <CheckIcon size={30} />
            </span>
            <h3 className="font-head text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              You cracked it
            </h3>
            <p className="m-0 max-w-[42ch] text-ink-2">
              Solved with {livesLabel(lives).replace(" left", "")} to spare. A fresh joke lands
              every morning.
            </p>
            <button type="button" className="btn btn-ghost" onClick={playAgain}>
              Play this one again
            </button>
          </div>
        </div>
      )}

      {gameState === "completeLoss" && (
        <div className="card">
          <div className="flex flex-col items-center gap-[14px] text-center">
            <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full border border-bad bg-bad-soft text-bad-ink [animation:trophy-in_480ms_cubic-bezier(0.2,0.85,0.25,1)_both]">
              <AlertIcon />
            </span>
            <h3 className="font-head text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              Out of lives
            </h3>
            <p className="m-0 max-w-[42ch] text-ink-2">
              Here it is:{" "}
              <span className="font-head text-2xl font-medium text-ink">{joke.punchline}</span>
            </p>
            <button type="button" className="btn btn-ghost" onClick={playAgain}>
              Try it again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
