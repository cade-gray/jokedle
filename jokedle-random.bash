#!/bin/bash

# Hit the endpoint with curl and save the response
response=$(curl -s https://api.cadegray.dev/joke/count)

# Parse the response with jq and extract the count number
count=$(echo $response | jq '.[0].count')
echo "Count: $count"

# Generate a random number between 1 and count
random_number=$((1 + RANDOM % count))

echo "Random number: $random_number"

curl -X POST https://api.cadegray.dev/joke/updatesequence \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{"user": "<USER>", "sequenceNbr": '$random_number'}'
