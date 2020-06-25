const path = require("path");
const fs = require("fs");
const moment = require("moment");

function setLastDeployment() {
  const deploymentDate = moment().format("YYYY-MM-DD-HH:mm");
  const indexFilePath = path.resolve(__dirname, "../public/index.html");
  let indexFile = fs.readFileSync(indexFilePath, "utf-8");
  indexFile = indexFile.replace("{{ latest_deployment }}", deploymentDate);
  fs.writeFileSync(indexFilePath, indexFile, { encoding: "utf-8" });
}

function getLatestDeploymentString() {
  return fetch(`${window.location.origin}/vue-refresh-on-deploy/index.html`)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc.querySelector("body").getAttribute("latest-deployment");
    });
}

module.exports = { setLastDeployment, getLatestDeploymentString };
