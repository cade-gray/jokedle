export interface Joke {
  jokeId: number;
  setup: string;
  punchline: string;
  formattedPunchline: string;
}

// GET /joke/all/weblist returns only these two fields, named as the API sends them.
export interface JokeListItem {
  jokeId: number;
  setup: string;
}
