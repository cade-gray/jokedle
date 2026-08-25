/**
 * Held while the joke is on its way. The skeleton tiles take the shape the
 * real board will take, so nothing jumps when it lands.
 */
export const GameSkeleton = () => (
  <div className="flex flex-col gap-5">
    <div className="card" aria-hidden="true">
      <div className="skeleton h-[14px] w-[84px]" />
      <div className="skeleton mt-[14px] h-[30px] w-[82%]" />
      <div className="skeleton mt-[10px] h-[30px] w-[46%]" />
      <div className="skeleton mt-5 h-5 w-[148px]" />
    </div>

    <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 py-2" aria-hidden="true">
      {[2, 3, 6, 2, 3, 5].map((wordLength, wordIndex) => (
        <div className="flex gap-[5px]" key={wordIndex}>
          {Array.from({ length: wordLength }, (_, tileIndex) => (
            <div className="skeleton h-[42px] w-8 rounded-[7px]" key={tileIndex} />
          ))}
        </div>
      ))}
    </div>

    <p className="hint text-center" role="status">
      Fetching today&rsquo;s joke&hellip;
    </p>
  </div>
);
