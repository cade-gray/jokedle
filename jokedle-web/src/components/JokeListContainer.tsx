import React, { useEffect } from "react";
import { Joke, JokeListItem } from "../interfaces/Joke";
import { SetAppState, SetFeedback, SetGameState } from "../interfaces/GameState";

export const JokeListContainer = ({
  setGameState,
  setJoke,
  setLetters,
  setLives,
  setFeedback,
  setAppState,
}: {
  setGameState: SetGameState;
  setJoke: React.Dispatch<React.SetStateAction<Joke>>;
  setLetters: React.Dispatch<React.SetStateAction<string[]>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setFeedback: SetFeedback;
  setAppState: SetAppState;
}) => {
  const [jokes, setJokes] = React.useState<JokeListItem[]>([]);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    fetch("https://jokedle-api.cadegray.dev/joke/all/weblist")
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data: JokeListItem[]) => {
        if (cancelled) return;
        setJokes(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const changeJoke = (jokeId: number) => {
    setGameState("loading");
    setAppState("inGame");

    fetch(`https://jokedle-api.cadegray.dev/joke/id/${jokeId}`)
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data: Joke) => {
        setJoke({
          jokeId: data.jokeId,
          setup: data.setup,
          punchline: data.punchline,
          formattedPunchline: data.formattedPunchline,
        });
        setLetters([]);
        setLives(3);
        setFeedback(null);
        setGameState("firstPick");
      })
      .catch(() => setAppState("error"));
  };

  return (
    <div className="card flex flex-col gap-4">
      <div>
        <h2 className="m-0 font-head text-[26px] font-semibold leading-tight text-ink sm:text-[34px]">
          Every joke so far
        </h2>
        <p className="mt-[6px] text-[16.5px] text-ink-2">Pick any one to play it from the start.</p>
      </div>

      {status === "loading" && (
        <div className="flex flex-col gap-2" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <div className="skeleton h-[52px] rounded-xl" key={index} />
          ))}
        </div>
      )}

      {status === "loading" && (
        <p className="sr-only" role="status">
          Loading the joke list.
        </p>
      )}

      {status === "error" && (
        <p className="m-0 text-bad-ink" role="status">
          The joke list did not load. Check your connection and try again.
        </p>
      )}

      {status === "ready" && (
        <div className="flex flex-col gap-2">
          {jokes.map((joke) => (
            <button
              type="button"
              key={joke.jokeId}
              className="joke-row"
              onClick={() => changeJoke(joke.jokeId)}
            >
              <span className="flex-none pt-px font-head text-[17px] font-semibold text-brand-ink">
                #{joke.jokeId}
              </span>
              <span>{joke.setup}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
