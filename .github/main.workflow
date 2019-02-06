workflow "New workflow" {
  on = "push"
  resolves = ["TreeScale Login"]
}

action "TreeScale Login" {
  uses = "actions/docker/cli@aea64bb1b97c42fa69b90523667fef56b90d7cff"
  secrets = ["TREESCALE_USER", "TREESCALE_SECRET"]
  runs = "echo \"$TREESCALE_SECRET\" | docker login --username $TREESCALE_USER --password-stdin"
}
