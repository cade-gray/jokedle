import { livesLabel } from "../interfaces/GameState";
import { HeartIcon } from "./icons";

const TOTAL_LIVES = 3;

/**
 * The hearts are decorative; the count beside them carries the meaning, so a
 * screen reader hears "2 lives left" rather than three unlabelled shapes.
 */
export const Lives = ({ lives }: { lives: number }) => (
  <div className="flex items-center gap-[10px]">
    <span className="flex gap-1" aria-hidden="true">
      {Array.from({ length: TOTAL_LIVES }, (_, index) => {
        const isLost = index >= lives;
        return (
          <span
            key={index}
            className={
              isLost
                ? "inline-flex text-line-strong [animation:heart-break_440ms_cubic-bezier(0.3,0.8,0.3,1)_both]"
                : "inline-flex text-bad transition-colors duration-[240ms]"
            }
          >
            <HeartIcon />
          </span>
        );
      })}
    </span>
    <span className="font-head text-[17px] font-medium uppercase tracking-[0.1em] text-ink-2">
      {livesLabel(lives)}
    </span>
  </div>
);
