const fs = require("fs");

function createPrimitiveFiles(
  componentType,
  componentNameWithoutCapitals,
  componentNameCapitalized
) {
  fs.appendFile(
    `./src/components/${componentType}s/${componentNameWithoutCapitals}.js`,
    viewTemplate(componentNameWithoutCapitals, componentNameCapitalized),
    (err) => err && console.log(err)
  );
}

export default createPrimitiveFiles;
