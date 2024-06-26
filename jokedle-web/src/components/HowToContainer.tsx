import { useEffect } from "react";

export const HowToContainer = () => {
  // Letters that have been guessed

  useEffect(() => {}, []);
  return (
    <div className="flex flex-col m-3 p-3 border border-jokedle rounded-md shadow-md shadow-[#4ac4da]">
      <h1 className="text-3xl text-center">How to Play</h1>
      <h2 className="text-xl text-center">Guess The Jokedle in 3 tries.</h2>
      <ul className="list-disc text-lg p-3">
        <li>
          You are given a setup to a joke, your task is to guess the punchline.
        </li>
        <li>
          Guessing a letter will reveal all instances of that letter in the
          punchline.
        </li>
        <li>
          First, you are given 5 free letters to pick. You are limited to only 2
          vowels (A,E,I,O,U)
        </li>
        <li>
          From there you are given 3 lives and can either guess a letter or
          guess the entire punchline.
        </li>
        <li>
          Each incorrect guess will result in you losing a life. After losing
          all 3 lives, the game is over and the punchline will be revealed.
        </li>
      </ul>
    </div>
  );
};
