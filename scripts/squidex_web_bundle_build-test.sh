#!/bin/bash
TIME_NOW="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "web-bundle: '$2'"
echo "version: '$3'"
echo "current time: '$TIME_NOW'"
echo "build url: '$4'"
echo "client-version id: '$5'"
echo "bundle type: '$6'"
echo "zipSize: '$7'"

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
  "zipSize":{"iv":"'$7'"},
  "buildDate":{"iv":"'$TIME_NOW'"}
}' 'https://cloud.squidex.io/api/content/skazbuka/web-bundle-build-test/?publish=true' > squidex-output.json

BUILD_ID="$(cat squidex-output.json | jq --raw-output '.id')"
echo "BUILD_ID: $BUILD_ID"
Response="$(cat squidex-output.json)"
echo "Response: $Response"

if [ "$BUILD_ID" == "null" ]; then
        echo "BUILD_ID is null"
        exit 1

if [ -z "$5" ]; then
        echo "client-version id not provided, exiting"
        exit 0
fi
if [ -z "$6" ]; then
        echo "bundle type not provided, exiting"
        exit 0
fi

# curl -XPOST -H 'Authorization: Bearer '$1'' -H "Content-type: application/json" -d '{
#   "'$6'":{"iv":["'$BUILD_ID'"]}
# }' 'https://prod.zebr-a.com/squidex/tools/draft/client-versions/'$5'/patch'