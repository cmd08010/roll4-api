#!/bin/bash

API="http://localhost:4741"
URL_PATH="/campaigns"

curl "${API}${URL_PATH}/${ID}/sessions/${SESSIONID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "session": {
      "text": "'"${TEXT}"'"
    }
  }'

echo
