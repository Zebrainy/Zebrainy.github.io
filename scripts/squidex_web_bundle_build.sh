#!/bin/bash
TIME_NOW="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "web-bundle: $2"
echo "version: $3"
echo "current time: $TIME_NOW"
echo "build url: $4"
echo "client-version id: $5"
echo "bundle type: $6"
echo "zipSize: $7"

if [ -z "$1" ]; then
        echo "Squidex token not provided"
        exit 1
fi

if [ -z "$2" ]; then
        echo "Bundle name not provided"
        exit 1
fi

if [ -z "$3" ]; then
        echo "Bundle version not provided"
        exit 1
fi

if [ -z "$4" ]; then
        echo "Build URL not provided"
        exit 1
fi

set -e

curl -XPOST -H 'Authorization: Bearer '$1'' -H "Content-type: application/json" -d '{
  "name":{"iv":"'$2'"},
  "version":{"iv":"'$3'"},
  "zip":{"iv":"'$4'"},
  "buildDate":{"iv":"'$TIME_NOW'"},
  "zipSize":{"iv":"'$7'"}
}' 'https://cloud.squidex.io/api/content/skazbuka/web-bundle-build/?publish=true' > squidex-output.json

BUILD_ID="$(cat squidex-output.json | jq --raw-output '.id')"

if [ -z "$5" ]; then
        echo "client-version id not provided, exiting"
        exit 0
fi
if [ -z "$6" ]; then
        echo "bundle type not provided, exiting"
        exit 0
fi

echo "build id: $BUILD_ID"

curl -XPOST -H 'Authorization: Bearer '$1'' -H "Content-type: application/json" -d '{
  "'$6'":{"iv":["'$BUILD_ID'"]}
}' 'https://prod.zebr-a.com/squidex/tools/draft/client-versions/'$5'/patch'