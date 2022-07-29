const { spawn } = require("child_process");
var fs = require("fs");

// Component templates
import appTemplate from "./templates/components/app/app-template";
import appIndexTemplate from "./templates/components/app/app-index-template";
import indexTemplate from "./templates/components/index";

// Style templates
import themeTemplate from "./templates/styles/theme-template";
import globalStylesTemplate from "./templates/styles/global-styles-template";

// Config templates
import routesTemplate from "./templates/config/routes-template";
import routerTemplate from "./templates/config/router-template";
import readmeTemplate from "./templates/config/readme-template";
import environmentsTemplate from "./templates/config/environments-config-template";
import apiConfigTemplate from "./templates/config/api-config-template";

import createComponent from "./create-component";

function createReactApp(projectName) {
  return new Promise(function (resolve, reject) {
    console.log(`Creating your project called '${projectName}'.`);
    console.log("Setting up React...");

    const ls = spawn("npx", [
      "create-react-app",
      projectName,
      "--template",
      "typescript",
    ]);

    ls.on("error", (error) => {
      console.log(error.message);
      reject(error);
    });

    ls.on("close", (code) => {
      console.log(`${projectName} has been initialized.`);
      console.log(`Now installing dependencies...`);
      resolve(code);
    });

    ls.stdout.on("data", (data) => {
      console.log(data.toString());
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
  fs.mkdirSync("./src/components/atoms", { recursive: true });
  fs.mkdirSync("./src/components/molecules", { recursive: true });
  fs.mkdirSync("./src/components/organisms", { recursive: true });
  fs.mkdirSync("./src/components/pages", { recursive: true });
  fs.mkdirSync("./src/components/pages/home", { recursive: true });
  fs.mkdirSync("./src/components/layouts", { recursive: true });
  fs.mkdirSync("./src/components/layouts/router", { recursive: true });
  fs.mkdirSync("./src/api", { recursive: true });
  fs.mkdirSync("./src/api/config", { recursive: true });
  fs.mkdirSync("./src/media/icons", { recursive: true });
  fs.mkdirSync("./src/media/images", { recursive: true });
  fs.mkdirSync("./src/media/videos", { recursive: true });
  fs.mkdirSync("./src/auth", { recursive: true });
  fs.mkdirSync("./src/state", { recursive: true });
  fs.mkdirSync("./src/config", { recursive: true });
  fs.mkdirSync("./src/config/router", { recursive: true });
  fs.mkdirSync("./src/config/router/routes", { recursive: true });
  fs.mkdirSync("./src/config/environments", { recursive: true });
  fs.mkdirSync("./src/metrics", { recursive: true });
  fs.mkdirSync("./src/styles", { recursive: true });
  fs.mkdirSync("./src/utils", { recursive: true });

  fs.appendFileSync(
    "./src/styles/theme.ts",
    themeTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/styles/global-styles.ts",
    globalStylesTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/config/router/routes/routes.tsx",
    routesTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/config/router/index.ts",
    indexTemplate("router"),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/config/router/router.tsx",
    routerTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/config/environments/.env-local",
    environmentsTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/api/config/api-config.ts",
    apiConfigTemplate(),
    (err) => err && console.log(err)
  );

  fs.unlinkSync("./src/App.tsx");
  fs.unlinkSync("./src/App.css");
  fs.unlinkSync("./src/index.css");
  fs.unlinkSync("./src/index.tsx");
  fs.unlinkSync("./src/logo.svg");

  fs.appendFileSync(
    "./src/App.tsx",
    appTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./src/index.tsx",
    appIndexTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFileSync(
    "./README.md",
    readmeTemplate(),
    (err) => err && console.log(err)
  );

  fs.mkdirSync("./src/components/pages/home", { recursive: true });
  fs.mkdirSync("./src/components/organisms/footer", { recursive: true });
  fs.mkdirSync("./src/components/organisms/primary-navigation", {
    recursive: true,
  });

  createComponent("page", "home", "Home");
  createComponent("organism", "footer", "Footer");
  createComponent("organism", "primary-navigation", "PrimaryNavigation");

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
    await installDependency("@types/styled-components");
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
