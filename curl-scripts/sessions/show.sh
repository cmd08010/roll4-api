#!/bin/sh

API="http://localhost:4741"
URL_PATH="/campaigns"

curl "${API}${URL_PATH}/${ID}/sessions/${SESSIONID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
