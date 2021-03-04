#!/bin/bash

API="http://localhost:4741"
URL_PATH="/campaigns"

curl "${API}${URL_PATH}/${ID}/session/${SESSIONID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
