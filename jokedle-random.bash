#!/bin/bash
#
# Sets the joke of the day to a random joke.
#
# The API picks the random number itself now (randomTf), so the old
# GET /joke/count lookup and the shell-side $RANDOM math are gone.
set -euo pipefail

API="${JOKEDLE_API:-https://jokedle-api.cadegray.dev}"
TOKEN="${JOKEDLE_TOKEN:-<TOKEN>}"
API_USER="${JOKEDLE_USER:-<USER>}"

response=$(curl -sS -X POST "$API/joke/sequence" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-User: $API_USER" \
  -d '{"randomTf": true}')

if [ "$(echo "$response" | jq -r '.success // false')" = "true" ]; then
  echo "Sequence set to random joke $(echo "$response" | jq -r '.sequenceNbr')"
else
  echo "Sequence update failed: $(echo "$response" | jq -r '.error // .')" >&2
  exit 1
fi
