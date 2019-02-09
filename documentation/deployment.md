# Deployment

Running on Kubernetes (DO). On Push to master all containers are built and pushed to their container registry. After that running `npm run deploy` will deploy to the kubernetes cluster.

## Prerequisites

You are expected to have a `k8s-syncify-kubeconfig.yaml` with the relevant kubernetes credentials in the root directory of this project.

## Databases

RabbitMQ + MySQL: Hosted on separate DO droplet with CaptainRover

## Commands

## Links

- [Pulling Images from Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)
