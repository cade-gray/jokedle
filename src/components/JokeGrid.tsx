export const JokeGrid: React.FC<{
  formattedPunchline: string;
  letters: string[];
  gameState: string;
}> = ({ formattedPunchline, letters, gameState }) => {
  const chars = Array.from(
    { length: 72 },
    (_, i) => formattedPunchline[i] || " "
  );
  const twContainerDefaults = "grid grid-cols-12 grid-rows-6 p-2";
  const twGridDefaults =
    "m-1 p-1 flex items-center justify-center text-2xl w-7 h-7 rounded-md shadow-md text-[#222222]";
  if (gameState === "completeLoss") {
    return (
      <div className={twContainerDefaults}>
        {chars.map((char, index) => (
          <div
            key={index}
            className={`${twGridDefaults} ${
              char === " "
                ? "bg-gray-600 border border-gray-600/20"
                : /^[a-zA-Z]$/.test(char)
                ? letters.includes(char.toUpperCase())
                  ? "bg-green-500 border border-gray-600"
                  : "bg-gray-100 border border-gray-600"
                : "bg-gray-400 border border-gray-600"
            }`}
          >
            {char}
          </div>
        ))}
      </div>
    );
    // Added for when punchline is guessed correctly but not all letters are guessed.
  } else if (gameState === "completeWin") {
    return (
      <div className={twContainerDefaults}>
        {chars.map((char, index) => (
          <div
            key={index}
            className={`${twGridDefaults} ${
              char === " "
                ? "bg-gray-600 border border-gray-600/20"
                : "bg-green-500 border border-gray-600"
            }`}
          >
            {char}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className={twContainerDefaults}>
        {chars.map((char, index) => (
          <div
            key={index}
            className={`${twGridDefaults} ${
              char === " "
                ? "bg-gray-600 border border-gray-600/20"
                : /^[a-zA-Z]$/.test(char)
                ? letters.includes(char.toUpperCase())
                  ? "bg-green-500 border border-gray-600"
                  : "bg-gray-100 border border-gray-600"
                : "bg-gray-400 border border-gray-600"
            }`}
          >
            {char === " " ||
            !/^[a-zA-Z]$/.test(char) ||
            letters
              .map((letter) => letter.toUpperCase())
              .includes(char.toUpperCase())
              ? char
              : ""}
          </div>
        ))}
      </div>
    );
  }
};
