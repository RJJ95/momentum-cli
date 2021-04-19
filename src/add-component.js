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
  componentNameCapitalized
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
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace(/\s+/g, "");

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
                componentNameCapitalized
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
