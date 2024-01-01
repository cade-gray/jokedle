export const JokeGrid: React.FC<{ formattedPunchline: string }> = ({
  formattedPunchline,
}) => {
  const chars = Array.from(
    { length: 72 },
    (_, i) => formattedPunchline[i] || " "
  );

  return (
    <div className="grid grid-cols-12 grid-rows-6">
      {chars.map((char, index) => (
        <div
          key={index}
          className={`m-1 p-1 flex items-center justify-center text-2xl font-semibold ${
            char === " " ? "bg-gray-400/20" : "bg-gray-300"
          }`}
        >
          {char === " " ? "" : char}
        </div>
      ))}
    </div>
  );
};
