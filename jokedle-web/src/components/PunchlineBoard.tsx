import React from "react";
import { GameState, isGuessable } from "../interfaces/GameState";

interface Tile {
  char: string;
  className: string;
  /** Position in the current reveal, for the staggered flip. */
  stagger: number;
}

/**
 * The punchline itself, word by word, wrapping where it needs to — so word
 * lengths read at a glance. This replaces the old fixed 12 x 6 grid of 72
 * cells, which padded every joke out with grey filler.
 *
 * Note it takes `punchline`, not `formattedPunchline`: the extra spaces in the
 * formatted string only existed to line words up on that fixed grid.
 */
export const PunchlineBoard = ({
  punchline,
  letters,
  gameState,
}: {
  punchline: string;
  letters: string[];
  gameState: GameState;
}) => {
  const revealAll = gameState === "completeWin" || gameState === "completeLoss";
  const guessed = React.useMemo(
    () => new Set(letters.filter(Boolean).map((letter) => letter.toUpperCase())),
    [letters]
  );

  // Only tiles that turned over since the last render get a staggered delay;
  // the rest keep their class, so their animation does not replay.
  const previouslyShown = React.useRef<Set<string>>(new Set());
  const shownNow = new Set<string>();
  let stagger = 0;

  const words = punchline.split(" ").filter(Boolean);
  const rows: Tile[][] = words.map((word) =>
    word.split("").map((char) => {
      if (!isGuessable(char)) {
        return { char, className: "tile tile-punct", stagger: -1 };
      }

      const upper = char.toUpperCase();
      const isFound = guessed.has(upper) || gameState === "completeWin";
      const isShown = revealAll || guessed.has(upper);

      if (!isShown) {
        return { char: "", className: "tile tile-hidden", stagger: -1 };
      }

      shownNow.add(upper);
      const isNew = !previouslyShown.current.has(upper);
      return {
        char: upper,
        className: isFound ? "tile tile-found" : "tile tile-missed",
        stagger: isNew ? stagger++ : -1,
      };
    })
  );

  React.useEffect(() => {
    previouslyShown.current = shownNow;
  });

  return (
    <div
      className="flex flex-wrap justify-center gap-x-3 gap-y-2 py-2 [perspective:800px] sm:gap-x-5 sm:gap-y-3"
      role="img"
      aria-label={boardLabel(punchline, guessed, revealAll)}
    >
      {/* flex-wrap on the word is a last resort for an unusually long one — it
          keeps the page from scrolling sideways on a narrow screen. */}
      {rows.map((tiles, wordIndex) => (
        <div className="flex flex-wrap justify-center gap-[4px] sm:gap-[5px]" key={wordIndex}>
          {tiles.map((tile, tileIndex) => (
            <div
              key={tileIndex}
              className={tile.className}
              aria-hidden="true"
              style={tile.stagger > 0 ? { animationDelay: `${tile.stagger * 65}ms` } : undefined}
            >
              {tile.char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * One label for the whole board. A screen reader would otherwise meet a long
 * run of unlabelled tiles and have no way to tell how far along the round is.
 */
const boardLabel = (punchline: string, guessed: Set<string>, revealAll: boolean): string => {
  if (revealAll) return `Punchline revealed: ${punchline}`;

  let total = 0;
  let found = 0;

  const spoken = punchline
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word
        .split("")
        .map((char) => {
          if (!isGuessable(char)) return char;
          total += 1;
          if (guessed.has(char.toUpperCase())) {
            found += 1;
            return char.toUpperCase();
          }
          return "blank";
        })
        .join(" ")
    )
    .join(", word break, ");

  return `Punchline, ${found} of ${total} letters revealed. ${spoken}`;
};
