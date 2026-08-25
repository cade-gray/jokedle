const STEPS: { lead: string; rest: string }[] = [
  {
    lead: "Read the setup.",
    rest: "The punchline stays hidden, one empty tile per letter, so you can see how long each word is.",
  },
  {
    lead: "Start with five free letters.",
    rest: "Pick any five to open the round — at most two of them vowels. Every match is revealed everywhere it appears.",
  },
  {
    lead: "Then guess one letter at a time.",
    rest: "A letter that turns up in the punchline is free. A letter that does not costs one life.",
  },
  {
    lead: "Or go for the whole punchline.",
    rest: "Switch to Whole punchline whenever you feel sure. Punctuation and capitals do not matter — only the words. A wrong guess costs one life.",
  },
  {
    lead: "You have three lives.",
    rest: "Lose all three and the round ends, and the punchline is revealed.",
  },
  {
    lead: "You win",
    rest: "the moment every letter in the punchline is showing — whether you spelled it out or guessed it outright.",
  },
];

export const HowToContainer = () => (
  <div className="card flex flex-col gap-5">
    <div>
      <h2 className="m-0 font-head text-[26px] font-semibold leading-tight text-ink sm:text-[34px]">
        How to play
      </h2>
      <p className="mt-[6px] text-[16.5px] text-ink-2">
        Every day brings one new joke. You get the setup — your job is to work out the punchline
        before your three lives run out.
      </p>
    </div>

    <ol className="m-0 flex list-none flex-col gap-4 p-0">
      {STEPS.map((step, index) => (
        <li className="flex items-start gap-[14px]" key={step.lead}>
          <span
            className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border border-brand bg-brand-soft font-head text-lg font-semibold text-brand-ink"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <p className="m-0 text-[16.5px] text-ink-2">
            <strong className="font-bold text-ink">{step.lead}</strong> {step.rest}
          </p>
        </li>
      ))}
    </ol>

    <p className="hint border-t border-line pt-4">
      Missed a day? Every past joke is in the <strong className="text-ink">Jokes</strong> tab, ready
      to play whenever you like.
    </p>
  </div>
);
