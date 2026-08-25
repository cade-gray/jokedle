import React from "react";
import { AppState, SetAppState } from "../interfaces/GameState";

const SECTIONS: { id: AppState; name: string }[] = [
  { id: "inGame", name: "Play" },
  { id: "howTo", name: "How to play" },
  { id: "jokeList", name: "Jokes" },
  { id: "jokeSubmission", name: "Submit" },
];

export const AppNav = ({
  appState,
  setAppState,
}: {
  appState: AppState;
  setAppState: SetAppState;
}) => {
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // "Play" stays the selected tab while the joke is still loading.
  const selectedIndex = Math.max(
    0,
    SECTIONS.findIndex((section) => section.id === appState)
  );

  // Arrow keys move between tabs, as the WAI-ARIA tabs pattern expects.
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next: number | null = null;

    if (event.key in offsets) {
      next = (index + offsets[event.key] + SECTIONS.length) % SECTIONS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = SECTIONS.length - 1;
    }

    if (next === null) return;
    event.preventDefault();
    setAppState(SECTIONS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <nav className="flex gap-[2px] border-b border-line" role="tablist" aria-label="Sections">
      {SECTIONS.map((section, index) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            key={section.id}
            type="button"
            role="tab"
            id={`tab-${section.id}`}
            aria-selected={isSelected}
            aria-controls={`panel-${section.id}`}
            tabIndex={isSelected ? 0 : -1}
            ref={(element) => (tabRefs.current[index] = element)}
            onKeyDown={(event) => onKeyDown(event, index)}
            onClick={() => setAppState(section.id)}
            className="tab"
          >
            {section.name}
          </button>
        );
      })}
    </nav>
  );
};
