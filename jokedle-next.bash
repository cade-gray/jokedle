#!/bin/bash
#
# Advances the joke of the day by one, wrapping back to 1 at the end.
#
# GET /joke/count no longer exists, so rather than comparing against the total
# up front, we try the next number and let the API tell us when we have run off
# the end -- it rejects out-of-range values with a 400. That is one fewer
# request than the old version and there is no count/update race.
set -euo pipefail

API="${JOKEDLE_API:-https://jokedle-api.cadegray.dev}"
TOKEN="${JOKEDLE_TOKEN:-<TOKEN>}"
API_USER="${JOKEDLE_USER:-<USER>}"

auth=(
  -H "Content-Type: application/json"
  -H "Authorization: Bearer $TOKEN"
  -H "X-User: $API_USER"
)

# Emits the response body with the trailing HTTP status on its own line.
set_sequence() {
  curl -sS -w '\n%{http_code}' -X POST "$API/joke/sequence" "${auth[@]}" \
    -d "{\"sequenceNbr\": $1}"
}

current=$(curl -sS "$API/joke/sequence" "${auth[@]}" | jq -r '.[0].sequenceNbr // empty')
if [ -z "$current" ]; then
  echo "Could not read the current sequence number" >&2
  exit 1
fi
echo "Current sequence number: $current"

next=$((current + 1))
result=$(set_sequence "$next")
status=$(printf '%s' "$result" | tail -n1)
body=$(printf '%s' "$result" | sed '$d')

# A 400 naming the sequence number means we passed the last joke: wrap to 1.
if [ "$status" = "400" ] &&
  printf '%s' "$body" | jq -e '.error? // "" | test("Invalid sequence number")' >/dev/null 2>&1; then
  echo "Sequence $next is past the last joke, wrapping to 1"
  next=1
  result=$(set_sequence "$next")
  status=$(printf '%s' "$result" | tail -n1)
  body=$(printf '%s' "$result" | sed '$d')
fi

if [ "$status" = "200" ] && [ "$(printf '%s' "$body" | jq -r '.success // false')" = "true" ]; then
  echo "Sequence number updated to $(printf '%s' "$body" | jq -r '.sequenceNbr')"
else
  echo "Sequence update failed (HTTP $status): $(printf '%s' "$body" | jq -r '.error // .')" >&2
  exit 1
fi
