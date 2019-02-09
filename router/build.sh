#!/usr/bin/env bash

set -e

docker build -t repo.treescale.com/liachthuaber/syncify-edge-router:$npm_package_version .
docker push repo.treescale.com/liachthuaber/syncify-edge-router:$npm_package_version