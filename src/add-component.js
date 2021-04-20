const inquirer = require("inquirer");
const fs = require("fs");
import { viewTemplate } from "./templates/view-template";
import { styleTemplate } from "./templates/style-template";
import { indexTemplate } from "./templates/index-template";

function createComponentFiles(
  componentType,
  componentNameWithoutCapitals,
  componentNameCapitalized
) {
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}-view.js`,
    viewTemplate(componentNameWithoutCapitals, componentNameCapitalized),
    (err) => err && console.log(err)
  );
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}-style.js`,
    styleTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}/index.js`,
    indexTemplate(componentNameWithoutCapitals),
    (err) => err && console.log(err)
  );
}

function createPageFiles(
  componentType,
  componentNameWithoutCapitals,
  componentNameCapitalized,
  componentNameFirstLetterLowercase
) {
  fs.appendFile(
    `./src/${componentType}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}-view.js`,
    viewTemplate(componentNameWithoutCapitals, componentNameCapitalized),
    (err) => err && console.log(err)
  );
  fs.appendFile(
    `./src/${componentType}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}-style.js`,
    styleTemplate(),
    (err) => err && console.log(err)
  );
  fs.appendFile(
    `./src/${componentType}s/${componentNameWithoutCapitals}/index.js`,
    indexTemplate(componentNameWithoutCapitals),
    (err) => err && console.log(err)
  );
  const file = "./src/config/routes.js";
  const data = fs.readFileSync(file); //read existing contents into data
  const fd = fs.openSync(file, "w+");
  const importStatement = new Buffer(
    `import ${componentNameCapitalized} from "../pages/${componentNameWithoutCapitals}";\n`
  );
  const search = new Buffer("export const routes = {");
  const newRoute = new Buffer(`${componentNameFirstLetterLowercase}: {
    path: "/${componentNameWithoutCapitals}",
    exact: true,
    component: ${componentNameCapitalized},
  },
};`);

  fs.writeSync(fd, importStatement, 0, importStatement.length, 0); //write new data
  fs.writeSync(fd, data, 0, data.length, importStatement.length); //append old data
  fs.writeSync(
    fd,
    newRoute,
    0,
    newRoute.length,
    data.length + importStatement.length - 3
  );
  fs.close(fd, (err) => {
    err && console.log(err);
  });
}

export function addComponent() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message:
          "What is the name of your component? [Please specify with spaces in between words and without capital letters. Like this: 'primary button'.]",
      },
      {
        type: "list",
        name: "type",
        message: "What kind of component do you want to create?",
        choices: ["primitive", "construct", "section", "functional", "page"],
      },
    ])
    .then((answers) => {
      const componentNameWithoutCapitals = answers.name
        .replace(/\s+/g, "-")
        .toLowerCase();
      const componentNameCapitalized = answers.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace(/\s+/g, "");
      const componentNameFirstLetterLowercase =
        componentNameCapitalized.charAt(0).toLowerCase() +
        componentNameCapitalized.slice(1);

      if (answers.type === "page") {
        fs.mkdir(
          `./src/${answers.type}s/${componentNameWithoutCapitals}`,
          (err) => {
            if (err) {
              console.log(err);
            } else {
              createPageFiles(
                answers.type,
                componentNameWithoutCapitals,
                componentNameCapitalized,
                componentNameFirstLetterLowercase
              );
            }
          }
        );
      } else {
        fs.mkdir(
          `./src/components/${answers.type}s/${componentNameWithoutCapitals}`,
          (err) => {
            if (err) {
              console.log(err);
            } else {
              createComponentFiles(
                answers.type,
                componentNameWithoutCapitals,
                componentNameCapitalized
              );
            }
          }
        );
      }
    })
    .catch(console.error);
}
