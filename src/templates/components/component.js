const componentTemplate = (componentName, componentNameCapitalized) =>
  `import { FC } from "react"
import { Wrapper } from "./${componentName}.style"
import { ${componentNameCapitalized}Props } from "./${componentName}.types"

const ${componentNameCapitalized}: FC<${componentNameCapitalized}Props> = () => {
    return <Wrapper></Wrapper>
};

export default ${componentNameCapitalized};
`;

export default componentTemplate;
