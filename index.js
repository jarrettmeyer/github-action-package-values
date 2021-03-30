const core = require("@actions/core");
const cp = require("child_process");
const path = require("path");

const commitSha = cp.execSync("git rev-parse HEAD").toString("utf-8");
const commitShaShort = cp
  .execSync("git rev-parse --short HEAD")
  .toString("utf-8");

core.setOutput("commit_sha", commitSha);
core.setOutput("commit_sha_short", commitShaShort);

const commitLog = cp.execSync("git log -1").toString("utf-8").split("\n");
const commitAuthor = commitLog[1].substring(8);
const commitDate = commitLog[2].substring(8);
const commitTimestamp = new Date(commitDate).valueOf();

core.setOutput("commit_author", commitAuthor);
core.setOutput("commit_date", commitDate);
core.setOutput("commit_timestamp", commitTimestamp);

const basePath = core.getInput("path");
const packagePath = path.resolve(basePath, "package.json");
const package = require(packagePath);

if (typeof package === "object") {
  if (typeof package.name === "string") {
    core.setOutput("package_name");
  }
  if (typeof package.version === "string") {
    core.setOutput("package_version");
  }
}
