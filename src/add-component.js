const inquirer = require("inquirer");
const fs = require("fs");

import createComponentFiles from "./create-component";

function addComponent() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "What kind of component do you want to create?",
        choices: ["atom", "molecule", "organism", "layout", "page"],
      },
      {
        type: "input",
        name: "name",
        message:
          "What is the name of your component? [Please specify with spaces in between words and without capital letters. Like this: 'primary button'.]",
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

      fs.mkdir(
        `./src/components/${answers.type}s/${componentNameWithoutCapitals}`,
        (err) => {
          if (err) {
            console.log("An error occurred.");
          } else {
            createComponentFiles(
              answers.type,
              componentNameWithoutCapitals,
              componentNameCapitalized
            );
          }
        }
      );
    })
    .catch(console.error);
}

export default addComponent;
