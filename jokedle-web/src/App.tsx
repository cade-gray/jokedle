import React, { useEffect } from "react";
import { AppNav } from "./components/AppNav";
import { GameContainer } from "./components/GameContainer";
import { GameSkeleton } from "./components/GameSkeleton";
import { HowToContainer } from "./components/HowToContainer";
import { JokeListContainer } from "./components/JokeListContainer";
import { JokeSubmissionContainer } from "./components/JokeSubmissionContainer";
import { ThemeToggle } from "./components/ThemeToggle";
import { AlertIcon } from "./components/icons";
import { useTheme } from "./hooks/useTheme";
import { AppState, Feedback, GameState } from "./interfaces/GameState";
import { Joke } from "./interfaces/Joke";

const EMPTY_JOKE: Joke = { jokeId: 0, setup: "", punchline: "", formattedPunchline: "" };

function App() {
  const { theme, toggleTheme } = useTheme();

  const [joke, setJoke] = React.useState<Joke>(EMPTY_JOKE);
  const [appState, setAppState] = React.useState<AppState>("loading");

  // Game state lives up here so switching sections leaves the round untouched.
  const [gameState, setGameState] = React.useState<GameState>("loading");
  const [letters, setLetters] = React.useState<string[]>([]);
  const [lives, setLives] = React.useState<number>(3);
  const [feedback, setFeedback] = React.useState<Feedback | null>(null);

  useEffect(() => {
    fetch("https://jokedle-api.cadegray.dev/joke")
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data: Joke[]) => {
        const today = data[0];
        setJoke({
          jokeId: today.jokeId,
          setup: today.setup,
          punchline: today.punchline,
          formattedPunchline: today.formattedPunchline,
        });
        setGameState("firstPick");
        // Only take them to the game if they are still waiting on it — they
        // may have wandered off to How to play while it loaded.
        setAppState((current) => (current === "loading" ? "inGame" : current));
      })
      .catch(() => setAppState("error"));
  }, []);

  // "loading" and "error" are still the Play section as far as the tabs go.
  const section = appState === "loading" || appState === "error" ? "inGame" : appState;

  const panel = () => {
    switch (appState) {
      case "loading":
        return <GameSkeleton />;
      case "error":
        return (
          <div className="card flex flex-col items-center gap-[14px] text-center">
            <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full border border-bad bg-bad-soft text-bad-ink">
              <AlertIcon />
            </span>
            <h2 className="m-0 font-head text-3xl font-semibold leading-tight text-ink">
              Today&rsquo;s joke did not load
            </h2>
            <p className="m-0 max-w-[42ch] text-ink-2">
              Something went wrong reaching the joke server. Reload the page to try again, or pick
              one from the Jokes tab.
            </p>
          </div>
        );
      case "howTo":
        return <HowToContainer />;
      case "jokeList":
        return (
          <JokeListContainer
            setGameState={setGameState}
            setJoke={setJoke}
            setLetters={setLetters}
            setLives={setLives}
            setFeedback={setFeedback}
            setAppState={setAppState}
          />
        );
      case "jokeSubmission":
        return <JokeSubmissionContainer />;
      default:
        return (
          <GameContainer
            gameState={gameState}
            setGameState={setGameState}
            joke={joke}
            letters={letters}
            setLetters={setLetters}
            lives={lives}
            setLives={setLives}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        );
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[960px] flex-col gap-4 px-4 pb-9 pt-5 sm:gap-[22px] sm:px-8 sm:pt-[30px]">
      <header className="flex items-start justify-between gap-3 sm:gap-6">
        <div>
          <h1 className="m-0 font-display text-[30px] leading-none text-ink sm:text-[42px]">
            Jokedle
          </h1>
          <p className="mt-[6px] font-head text-[15px] font-medium uppercase leading-none tracking-[0.13em] text-ink-3 sm:mt-2 sm:text-[19px]">
            Guess the punchline
          </p>
        </div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <AppNav appState={appState} setAppState={setAppState} />

      {/* Keyed on the section so the panel remounts and the entry animation
          plays on every switch. */}
      <div
        key={appState}
        className="pane flex flex-1 flex-col gap-5"
        role="tabpanel"
        id={`panel-${section}`}
        aria-labelledby={`tab-${section}`}
      >
        {panel()}
      </div>

      {/* py-2 on the links enlarges the tap target without disturbing the line. */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-[18px] text-sm text-ink-3 [&_a]:py-2">
        <p className="m-0">
          Made with ❤️ by <a href="https://cadegray.dev">Cade Gray</a>
        </p>
        <p className="m-0">
          <a href="https://github.com/cade-gray/jokedle-web">Source code</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
