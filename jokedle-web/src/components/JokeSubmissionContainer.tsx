import React, { useState } from "react";
import { CheckIcon, CrossIcon } from "./icons";

const SETUP_MAX = 255;
const PUNCHLINE_MAX = 50;
const SOURCE_MAX = 45;

type Status = "idle" | "sending" | "sent" | "error";

export const JokeSubmissionContainer = () => {
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://jokedle-api.cadegray.dev/joke/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ joke: { setup, punchline, source } }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("sent");
      setSetup("");
      setPunchline("");
      setSource("");
    } catch {
      // Deliberately not logged: the response can carry detail that should not
      // end up in the browser console.
      setStatus("error");
    }
  };

  // Typing again clears the last result so the message never goes stale.
  const onEdit = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (value: T) => {
    setter(value);
    setStatus((current) => (current === "idle" || current === "sending" ? current : "idle"));
  };

  return (
    <div className="card flex flex-col gap-[18px]">
      <div>
        <h2 className="m-0 font-head text-[26px] font-semibold leading-tight text-ink sm:text-[34px]">
          Send in a joke
        </h2>
        <p className="mt-[6px] max-w-[60ch] text-[16.5px] text-ink-2">
          Got one worth sharing? Send it over. I read every submission before it goes in, and I keep
          the list to jokes that are genuinely funny and fine for anyone to read — so nothing too
          cheesy, crude or unkind.
        </p>
      </div>

      <form className="flex flex-col gap-[14px]" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="submit-setup">
            Setup
          </label>
          <textarea
            id="submit-setup"
            className="field"
            rows={2}
            maxLength={SETUP_MAX}
            required
            value={setup}
            onChange={(event) => onEdit(setSetup)(event.target.value)}
            placeholder="Why did the scarecrow win an award?"
          />
          <p className="hint mt-1">
            {setup.length} of {SETUP_MAX} characters
          </p>
        </div>

        <div>
          <label className="label" htmlFor="submit-punchline">
            Punchline
          </label>
          <textarea
            id="submit-punchline"
            className="field"
            rows={2}
            maxLength={PUNCHLINE_MAX}
            required
            value={punchline}
            onChange={(event) => onEdit(setPunchline)(event.target.value)}
            placeholder="He was outstanding in his field."
          />
          <p className="hint mt-1">
            {punchline.length} of {PUNCHLINE_MAX} characters — short punchlines make the best
            puzzles.
          </p>
        </div>

        <div>
          <label className="label" htmlFor="submit-source">
            Your name
          </label>
          <input
            id="submit-source"
            className="field"
            type="text"
            maxLength={SOURCE_MAX}
            required
            value={source}
            onChange={(event) => onEdit(setSource)(event.target.value)}
            placeholder="So I can credit you"
          />
        </div>

        <div className="flex flex-wrap items-center gap-[14px]">
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send it in"}
          </button>

          {/* Replaces the alert() the old build used, so focus stays put and
              the message can be re-read. */}
          <div role="status" aria-live="polite">
            {status === "sent" && (
              <p className="m-0 flex items-center gap-2 text-[15px] font-medium text-good-ink [animation:pop-in_240ms_cubic-bezier(0.2,0.8,0.25,1)_both]">
                <CheckIcon />
                <span>Thanks — it is in the queue. I will take a look.</span>
              </p>
            )}
            {status === "error" && (
              <p className="m-0 flex items-center gap-2 text-[15px] font-medium text-bad-ink [animation:pop-in_240ms_cubic-bezier(0.2,0.8,0.25,1)_both]">
                <CrossIcon />
                <span>That did not go through. Please try again in a moment.</span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
