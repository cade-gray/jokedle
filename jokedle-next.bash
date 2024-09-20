#!/bin/bash

# Hit the endpoint with curl and save the response
countResponse=$(curl -s https://api.cadegray.dev/joke/count)
getSequenceResponse=$(curl -X POST https://api.cadegray.dev/joke/getsequence -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"user": "<USER>"}')

# Parse the response with jq and extract the count number
count=$(echo $countResponse | jq '.[0].count')
currSequenceNbr=$(echo $getSequenceResponse | jq '.[0].sequenceNbr')
echo "Count: $count"
echo "Current Sequnce Nbr: $currSequenceNbr"

# Check to see if the current sequence number equals the count or is greater
declare sequenceUpdateResponse
if [ $currSequenceNbr -eq $count ] || [ $currSequenceNbr -gt $count ]
then
    echo "Current sequence number equals count or is greater"
    # If so, reset the sequence number to 1
    sequenceUpdateResponse=$(curl -X POST https://api.cadegray.dev/joke/updatesequence \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <TOKEN>" \
    -d '{"user": "<USERNAME>", "sequenceNbr": 1}')
else
    # If not, increment the sequence number by 1
    echo "Current sequence number does not equal count"
    sequenceUpdateResponse=$(curl -X POST https://api.cadegray.dev/joke/updatesequence \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <TOKEN>" \
    -d '{"user": "<USER>", "sequenceNbr": '$((currSequenceNbr + 1))'}')
fi
successTF=$(echo $sequenceUpdateResponse | jq '.success')
# Check to see if successTF is true or false and print the appropriate message
if [ $successTF = true ]
then
    echo "Sequence number updated successfully"
else
    echo "Sequence number update failed"
fi
