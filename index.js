import core from "@actions/core";
import { execSync } from "child_process";
import { EOL } from "os";
import { resolve } from "path";

const commitSha = execSync("git rev-parse HEAD").toString("utf-8");
const commitShaShort = execSync("git rev-parse --short HEAD").toString("utf-8");

core.setOutput("commit_sha", commitSha);
core.setOutput("commit_sha_short", commitShaShort);

const commitLog = execSync("git log -1").toString("utf-8").split(EOL);
const commitAuthor = commitLog[1].substring(8);
const commitDate = commitLog[2].substring(8);
const commitTimestamp = new Date(commitDate).valueOf();

core.setOutput("commit_author", commitAuthor);
core.setOutput("commit_date", commitDate);
core.setOutput("commit_timestamp", commitTimestamp);

const basePath = core.getInput("path");
const packagePath = resolve(basePath, "package.json");
const package = require(packagePath);

if (package) {
  if (typeof package.name === "string") {
    core.setOutput("package_name");
  }
  if (typeof package.version === "string") {
    core.setOutput("package_version");
  }
}
