import core from "@actions/core";
import { execSync } from "child_process";
import { resolve } from "path";

const commitSha = execSync("git rev-parse HEAD");
const commitShaShort = execSync("git rev-parse --short HEAD");

core.setOutput("commit_sha", commitSha)
core.setOutput("commit_sha_short", commitShaShort);

const basePath = core.getInput("path");
const packagePath = resolve(basePath, "package.json");
const package = require(packagePath);

if (package) {
  if (package.name) {
    core.setOutput("package_name");
  }
  if (package.version) {
    core.setOutput("package_version");
  }
}



