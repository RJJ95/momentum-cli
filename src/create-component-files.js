const fs = require("fs");

import viewTemplate from "./templates/view-template";
import indexTemplate from "./templates/index-template";
import styleTemplate from "./templates/style-template";

function createComponentFiles(
  componentType,
  componentNameWithoutCapitals,
  componentNameCapitalized
) {
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}.js`,
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

export default createComponentFiles;
