export const JokeGrid: React.FC<{
  formattedPunchline: string;
  letters: string[];
}> = ({ formattedPunchline, letters }) => {
  const chars = Array.from(
    { length: 72 },
    (_, i) => formattedPunchline[i] || " "
  );

  return (
    <div className="grid grid-cols-12 grid-rows-6">
      {chars.map((char, index) => (
        <div
          key={index}
          className={`m-1 p-1 flex items-center justify-center text-2xl font-semibold w-6 h-6 ${
            char === " " || !/^[a-zA-Z]$/.test(char)
              ? "bg-gray-400/20 border border-gray-600/20"
              : letters.includes(char.toUpperCase())
              ? "bg-green-500 border border-gray-600"
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
};
