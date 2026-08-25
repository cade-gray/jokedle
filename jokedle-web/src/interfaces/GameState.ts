import React from "react";

export type AppState = "loading" | "error" | "inGame" | "howTo" | "jokeList" | "jokeSubmission";

export type GameState =
  | "loading"
  | "firstPick"
  | "guessingLetter"
  | "guessingPunchline"
  | "completeWin"
  | "completeLoss";

export type SetAppState = React.Dispatch<React.SetStateAction<AppState>>;
export type SetGameState = React.Dispatch<React.SetStateAction<GameState>>;

/** A message shown under the board and announced to screen readers. */
export interface Feedback {
  kind: "good" | "bad";
  text: string;
}

export type SetFeedback = React.Dispatch<React.SetStateAction<Feedback | null>>;

export const VOWELS = ["A", "E", "I", "O", "U"];

/** Letters and digits only, upper-cased — the form guesses are compared against. */
export const toKey = (text: string): string =>
  text.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

export const isLetter = (char: string): boolean => /^[a-zA-Z]$/.test(char);

/** True for characters that get a tile; anything else is punctuation. */
export const isGuessable = (char: string): boolean => /^[a-zA-Z0-9]$/.test(char);

export const livesLabel = (lives: number): string =>
  lives === 1 ? "1 life left" : `${lives} lives left`;
