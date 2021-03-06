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
      "description": "'"${DESCR}"'",
      "title": "'"${TITLE}"'"
    }
  }'

echo

# TITLE="New campaign" TEXT="lets add an entry" TOKEN=d267ef5b7ab8c3ad424d95bb041b9c3b sh curl-scripts/campaigns/create.sh
