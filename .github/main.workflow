workflow "Build" {
  on = "push"
  resolves = ["Publish Edge Router Image", "Publish API Image", "Publish Frontend Image"]
}

action "Is Master Branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "TreeScale Login" {
  uses = "actions/docker/login@master"
  needs = "Is Master Branch"
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD", "DOCKER_REGISTRY_URL"]
}

action "Build API" {
  uses = "actions/docker/cli@aea64bb1b97c42fa69b90523667fef56b90d7cff"
  runs = "docker build -t repo.treescale.com/liachthuaber/syncify-api:latest ./api"
  needs = "TreeScale Login"
}

action "Publish API Image" {
  uses = "actions/docker/cli@aea64bb1b97c42fa69b90523667fef56b90d7cff"
  runs = "docker push repo.treescale.com/liachthuaber/syncify-api:latest"
  needs = "Build API"
}

action "Build Frontend" {
  uses = "actions/docker/cli@aea64bb1b97c42fa69b90523667fef56b90d7cff"
  runs = "docker build -t repo.treescale.com/liachthuaber/syncify-frontend:latest ./frontend"
  needs = "TreeScale Login"
}

action "Publish Frontend Image" {
  uses = "actions/docker/cli@aea64bb1b97c42fa69b90523667fef56b90d7cff"
  runs = "docker push repo.treescale.com/liachthuaber/syncify-frontend:latest"
  needs = "Build Frontend"
}

action "Build Edge Router" {
  uses = "actions/docker/cli@aea64bb1b97c42fa69b90523667fef56b90d7cff"
  runs = "docker build -t repo.treescale.com/liachthuaber/syncify-edge-router:latest ./router"
  needs = "TreeScale Login"
}

action "Publish Edge Router Image" {
  uses = "actions/docker/cli@aea64bb1b97c42fa69b90523667fef56b90d7cff"
  runs = "docker push repo.treescale.com/liachthuaber/syncify-edge-router:latest"
  needs = "Build Edge Router"
}