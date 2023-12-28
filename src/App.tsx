import { useEffect } from "react";
import "./App.css";
import React from "react";

interface Joke {
  setup: string;
  punchline: string;
  formattedPunchline?: string;
}
function App() {
  const testPunchline = "Horses will no longer   get a square meal.";
  const [joke, setJoke] = React.useState<Joke>({
    setup: "",
    punchline: "",
    formattedPunchline: "",
  });
  useEffect(() => {
    fetch("https://api.cadegray.dev/joke")
      .then((response) => response.json())
      .then((data) => {
        const jokeBody = data[0];
        setJoke({ setup: jokeBody.setup, punchline: jokeBody.punchline });
      });
  }, []);

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold underline">Jokedle</h1>
      <p className="text-xl font-semibold">{joke.setup}</p>
      <div className="grid grid-cols-12 grid-rows-6">
        {Array.from(testPunchline, (char, index) => (
          <div
            key={index}
            className={`m-1 p-1 flex items-center justify-center text-2xl font-semibold ${
              char === " " ? "bg-gray-400/20" : "bg-gray-300"
            }`}
          >
            {char === " " ? "" : char}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
