#!/bin/bash

# Call this from an npm script to automatically populate npm package name and version env variables

set -e

APP_VERSION=$npm_package_version
template=`cat "deploy.template.yaml" | sed "s/{{APP_VERSION}}/$APP_VERSION/g"`

echo "$template" | kubectl apply --kubeconfig="../k8s-syncify-kubeconfig.yaml" -f -
