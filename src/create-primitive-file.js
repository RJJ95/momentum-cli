const fs = require("fs");

import styleTemplate from "./templates/style-template";

function createPrimitiveFiles(
  componentType,
  componentNameWithoutCapitals,
  componentNameCapitalized
) {
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}.js`,
    styleTemplate(componentNameWithoutCapitals, componentNameCapitalized),
    (err) => err && console.log(err)
  );
}

export default createPrimitiveFiles;
