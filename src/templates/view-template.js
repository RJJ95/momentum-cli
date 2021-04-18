export const viewTemplate = (componentName, componentNameCapitalized) =>
  `import { Wrapper } from "./${componentName}"

const ${componentNameCapitalized} = () => {
    return <Wrapper></Wrapper>
};

export default ${componentNameCapitalized};
    
    `;
