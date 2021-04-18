const inquirer = require("inquirer");
const fs = require("fs");
import { viewTemplate } from "./templates/view-template";
import { styleTemplate } from "./templates/style-template";
import { indexTemplate } from "./templates/index-template";

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
        choices: ["primitive", "construct", "section", "page"],
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
          (err) => err && console.log(err)
        );
      } else {
        fs.mkdir(
          `./src/components/${answers.type}s/${componentNameWithoutCapitals}`,
          (err) => err && console.log(err)
        );
      }
      fs.appendFile(
        `./src/components/${answers.type}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}-view.js`,
        viewTemplate(componentNameWithoutCapitals, componentNameCapitalized),
        (err) => err && console.log(err)
      );
      fs.appendFile(
        `./src/components/${answers.type}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}-style.js`,
        styleTemplate(),
        (err) => err && console.log(err)
      );
      fs.appendFile(
        `./src/components/${answers.type}s/${componentNameWithoutCapitals}/index.js`,
        indexTemplate(componentNameWithoutCapitals),
        (err) => err && console.log(err)
      );
    })
    .catch(console.error);
}
