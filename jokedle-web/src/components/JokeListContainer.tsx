import { useEffect } from "react";
import { Joke, JokeListItem } from "../interfaces/Joke";
import React from "react";

export const JokeListContainer = ({
    setGameState,
    setJoke,
    setLetters,
    setLives,
    setFeedbackMsg,
    setAppState
}: {
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
    setLetters: React.Dispatch<React.SetStateAction<string[]>>;
    setLives: React.Dispatch<React.SetStateAction<number>>;
    setFeedbackMsg: React.Dispatch<React.SetStateAction<string>>;
    setJoke: React.Dispatch<React.SetStateAction<Joke>>;
    setAppState: React.Dispatch<React.SetStateAction<"loading" | "inGame" | "howTo" | "jokeList" | "jokeSubmission">>;
}) => {
    // Array of jokes pulled from api
    const [jokes, setJokes] = React.useState<JokeListItem[]>([]);

    const changeJoke = (jokeId: number) => {
        console.log(jokeId);
        fetch(`https://jokedle-api.cadegray.dev/joke/id/${jokeId}`)
            .then((response) => response.json())
            .then((data) => {
                setJoke({
                    jokeId: data.jokeId,
                    setup: data.setup,
                    punchline: data.punchline,
                    formattedPunchline: data.formattedPunchline,
                });
                setGameState("firstPick");
                setLetters([]);
                setLives(3);
                setFeedbackMsg("");
                setAppState("inGame");
            });
    }

    useEffect(() => {
        fetch("https://jokedle-api.cadegray.dev/joke/all/weblist")
            .then((response) => response.json())
            .then((data) => setJokes(data));
    }, []);
    return (
        <div className="flex flex-col m-3 p-3 border border-jokedle rounded-md shadow-md shadow-[#4ac4da]">
            <h1 className="text-3xl text-center font-teko-semibold">Joke List</h1>
            <div className="flex flex-col">
                {jokes.length === 0 && <p>Loading Jokes...</p>}
                {jokes.map((joke) => (
                    <div key={joke.jokeId} className="flex flex-col m-2 p-2 shadow-md border border-jokedle rounded-md hover:shadow-[#4ac4da]">
                        <button className="text-lg font-teko-semibold bg-transparent" onClick={()=>changeJoke(joke.jokeId)}>#{joke.jokeId}: {joke.setup}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};