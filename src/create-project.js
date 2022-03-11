const { spawn } = require("child_process");
var fs = require("fs");

import themeTemplate from "./templates/theme-template";
import globalStylesTemplate from "./templates/global-styles-template";
import routesTemplate from "./templates/routes-template";
import indexTemplate from "./templates/index-template";
import routerTemplate from "./templates/router-template";
import appTemplate from "./templates/app-template";
import appIndexTemplate from "./templates/app-index-template";
import readmeTemplate from "./templates/readme-template";
import environmentsView from "./templates/environments-view";
import apiConfigTemplate from "./templates/apiConfig";

import createComponentFiles from "./create-component-files";

function createReactApp(projectName) {
  return new Promise(function (resolve, reject) {
    console.log("We're setting up your project.");
    console.log(`Creating your project called '${projectName}'.`);
    console.log("Setting up React...");

    const ls = spawn("npx", ["create-react-app", projectName]);

    ls.on("error", (error) => {
      console.log(error.message);
      reject(error);
    });

    ls.on("close", (code) => {
      console.log(`${projectName} has been initialized.`);
      console.log(`Now installing dependencies...`);
      resolve(code);
    });
  });
}

function installDependency(dependencyName) {
  return new Promise(function (resolve, reject) {
    console.log(`Installing ${dependencyName}...`);
    const ls = spawn("npm", ["i", dependencyName]);

    ls.on("error", (error) => {
      console.log(error.message);
      reject(error);
    });

    ls.on("close", (code) => {
      console.log(`Done installing ${dependencyName}.`);
      resolve(code);
    });
  });
}

function createFolderStructure() {
  console.log("Setting up folder structure");
  fs.mkdirSync("./src/components/primitives", { recursive: true });
  fs.mkdirSync("./src/components/constructs", { recursive: true });
  fs.mkdirSync("./src/components/sections", { recursive: true });
  fs.mkdirSync("./src/components/pages", { recursive: true });
  fs.mkdirSync("./src/components/pages/home", { recursive: true });
  fs.mkdirSync("./src/components/functionals", { recursive: true });
  fs.mkdirSync("./src/components/functionals/router", { recursive: true });
  fs.mkdirSync("./src/api", { recursive: true });
  fs.mkdirSync("./src/api/config", { recursive: true });
  fs.mkdirSync("./src/media/icons", { recursive: true });
  fs.mkdirSync("./src/media/images", { recursive: true });
  fs.mkdirSync("./src/media/videos", { recursive: true });
  fs.mkdirSync("./src/auth", { recursive: true });
  fs.mkdirSync("./src/state", { recursive: true });
  fs.mkdirSync("./src/config", { recursive: true });
  fs.mkdirSync("./src/config/routes", { recursive: true });
  fs.mkdirSync("./src/config/environments", { recursive: true });
  fs.mkdirSync("./src/metrics", { recursive: true });
  fs.mkdirSync("./src/styles", { recursive: true });
  fs.mkdirSync("./src/utils", { recursive: true });

  fs.appendFileSync(
    "./src/styles/theme.js",
    themeTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/styles/global-styles.js",
    globalStylesTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/config/routes/routes.js",
    routesTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/components/functionals/router/index.js",
    indexTemplate("router"),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/components/functionals/router/router.js",
    routerTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/config/environments/.env-local",
    environmentsView(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/api/config/api-config.js",
    apiConfigTemplate(),
    (err) => err && console.log(err)
  );

  fs.unlinkSync("./src/App.js");
  fs.unlinkSync("./src/App.css");
  fs.unlinkSync("./src/index.css");
  fs.unlinkSync("./src/index.js");
  fs.unlinkSync("./src/logo.svg");

  fs.appendFileSync(
    "./src/App.js",
    appTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/index.js",
    appIndexTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./README.md",
    readmeTemplate(),
    (err) => err && console.log(err)
  );

  fs.mkdirSync("./src/components/pages/home", { recursive: true });
  fs.mkdirSync("./src/components/sections/footer", { recursive: true });
  fs.mkdirSync("./src/components/sections/primary-navigation", {
    recursive: true,
  });

  createComponentFiles("page", "home", "Home");
  createComponentFiles("section", "footer", "Footer");
  createComponentFiles("section", "primary-navigation", "PrimaryNavigation");

  const rawdata = fs.readFileSync("./package.json");
  const jsonPackage = JSON.parse(rawdata);
  jsonPackage.scripts.start =
    "env-cmd -f src/config/environments/.env-local react-scripts start";
  fs.writeFileSync("./package.json", JSON.stringify(jsonPackage, null, 2));

  console.log("Folder structure has been set up.");
}

async function createProject(projectName) {
  try {
    await createReactApp(projectName);
    process.chdir(projectName);
    await installDependency("styled-components");
    await installDependency("axios");
    await installDependency("react-router-dom");
    await installDependency("env-cmd");
  } catch (error) {
    console.log(error);
  }

  createFolderStructure();
  console.log("Your project has been kickstarted. Enjoy coding!");
}

export default createProject;
