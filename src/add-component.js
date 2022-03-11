const inquirer = require("inquirer");
const fs = require("fs");

import createPrimitiveFiles from "./create-primitive-file";
import createComponentFiles from "./create-component-files";
import addRoute from "./add-route";

function addComponent() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "What kind of component do you want to create?",
        choices: ["primitive", "construct", "section", "functional", "page"],
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

      if (answers.type === "primitive") {
        fs.mkdir(
          `./src/components/${answers.type}s/${componentNameWithoutCapitals}`,
          (err) => {
            if (err) {
              console.log(err);
            } else {
              createPrimitiveFiles(
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

export default addComponent;
