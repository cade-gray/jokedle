import { useEffect } from "react";
import "./App.css";
import React from "react";

interface Joke {
  setup: string;
  punchline: string;
}
function App() {
  const [joke, setJoke] = React.useState<Joke>({
    setup: "",
    punchline: "",
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
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold underline">Jokedle</h1>
      <p className="text-xl font-semibold">{joke.setup}</p>
      <p className="text-xl font-semibold">{joke.punchline}</p>
      <div></div>
    </div>
  );
}

export default App;
