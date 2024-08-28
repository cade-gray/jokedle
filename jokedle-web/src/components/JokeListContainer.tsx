import { useEffect } from "react";
import { Joke } from "../interfaces/Joke";
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
    const [jokes, setJokes] = React.useState<Joke[]>([]);

    const changeJoke = (jokeId: number) => {
        console.log(jokeId);
        fetch(`https://api.cadegray.dev/joke/id/${jokeId}`)
            .then((response) => response.json())
            .then((data) => {
                setJoke({
                    jokeid: data.jokeId,
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
        fetch("https://api.cadegray.dev/joke/all/weblist")
            .then((response) => response.json())
            .then((data) => setJokes(data));
    }, []);
    return (
        <div className="flex flex-col m-3 p-3 border border-jokedle rounded-md shadow-md shadow-[#4ac4da]">
            <h1 className="text-3xl text-center font-teko-semibold">Joke List</h1>
            <div className="flex flex-col">
                {jokes.map((joke) => (
                    <div key={joke.jokeid} className="flex flex-col m-2 p-2 shadow-md border border-jokedle rounded-md hover:shadow-[#4ac4da]">
                        <button className="text-lg font-teko-semibold bg-transparent" onClick={()=>changeJoke(joke.jokeid)}>#{joke.jokeid}: {joke.setup}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};