const path = require("path");
const fs = require("fs");
const moment = require("moment");

export function setLastDeployment() {
  const deploymentDate = moment().format("YYYY-MM-DD-HH:mm");
  const indexFilePath = path.resolve(__dirname, "../public/index.html");
  let indexFile = fs.readFileSync(indexFilePath, "utf-8");
  indexFile = indexFile.replace("{{ latest_deployment }}", deploymentDate);
  fs.writeFileSync(indexFilePath, indexFile, { encoding: "utf-8" });
}
