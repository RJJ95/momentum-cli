const fs = require("fs");

// Templates
import componentTemplate from "./templates/components/component";
import styleTemplate from "./templates/components/component.styles";
import typesTemplate from "./templates/components/component.types";
import indexTemplate from "./templates/components/index";

function createComponentFiles(
  componentType,
  componentNameWithoutCapitals,
  componentNameCapitalized
) {
  // Component
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}.tsx`,
    componentTemplate(componentNameWithoutCapitals, componentNameCapitalized),
    (err) => err && console.log(err)
  );
  // Style
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}.style.ts`,
    styleTemplate(),
    (err) => err && console.log(err)
  );
  // Types
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}/${componentNameWithoutCapitals}.types.ts`,
    typesTemplate(componentNameCapitalized),
    (err) => err && console.log(err)
  );
  // Index
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}/index.ts`,
    indexTemplate(componentNameWithoutCapitals),
    (err) => err && console.log(err)
  );
}

export default createComponentFiles;
