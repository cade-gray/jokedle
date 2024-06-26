import { createContext } from "react";

export const LettersContext = createContext({
  letters: [] as string[],
});
