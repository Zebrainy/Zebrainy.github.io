#!/bin/bash
TIME_NOW="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "game: $2"
echo "version: $3"
echo "current time: $TIME_NOW"
echo "build url: $4"
echo "catalog-game id: $5"
echo "zipSize: $6"
echo "protocol-url: $7"

if [ -z "$1" ]; then
        echo "Squidex token not provided"
        exit 1
fi

if [ -z "$2" ]; then
        echo "Game name not provided"
        exit 1
fi

if [ -z "$3" ]; then
        echo "Game version not provided"
        exit 1
fi

if [ -z "$4" ]; then
        echo "Build URL not provided"
        exit 1
fi

set -e

curl -XPOST -H 'Authorization: Bearer '$1'' -H "Content-type: application/json" -d '{
  "gameId":{"iv":"'$2'"},
  "version":{"iv":"'$3'"},
  "url":{"iv":"'$4'"},
  "buildDate":{"iv":"'$TIME_NOW'"},
  "zipSize":{"iv":"'$6'"},
  "protocol-url":{"iv":"'$7'"}
}' 'https://cloud.squidex.io/api/content/skazbuka/web-game-build/?publish=true' > squidex-output.json

BUILD_ID="$(cat squidex-output.json | jq --raw-output '.id')"
echo "BUILD_ID: $BUILD_ID"
Response="$(cat squidex-output.json)"
echo "Response: $Response"

if [ $BUILD_ID == "null" ]; then
        echo "Build_ID error. Curl without zipSize"
        curl -XPOST -H 'Authorization: Bearer '$1'' -H "Content-type: application/json" -d '{
        "gameId":{"iv":"'$2'"},
        "version":{"iv":"'$3'"},
        "url":{"iv":"'$4'"},
        "buildDate":{"iv":"'$TIME_NOW'"}
        }' 'https://cloud.squidex.io/api/content/skazbuka/web-game-build/?publish=true' > squidex-output.json
        BUILD_ID="$(cat squidex-output.json | jq --raw-output '.id')"
        echo "BUILD_ID: $BUILD_ID"
        Response="$(cat squidex-output.json)"
        echo "Response: $Response"               
fi


if [ -z "$5" ]; then
        echo "catalog-game id not provided, exiting"
        exit 0
fi

echo "build id: $BUILD_ID"

curl -XPOST -H 'Authorization: Bearer '$1'' -H "Content-type: application/json" -d '{
  "build":{"iv":["'$BUILD_ID'"]}
}' 'https://prod.zebr-a.com/squidex/tools/draft/catalog-game/'$5'/patch'