#!/bin/bash

API="http://localhost:4741"
URL_PATH="/campaigns"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "campaign": {
      "text": "'"${TEXT}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo

# TITLE="First campaign" TEXT="lets go" TOKEN=00d82b45d56184bab1e1598f2104a322 sh curl-scripts/campaigns/create.sh
