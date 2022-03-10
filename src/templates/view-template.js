const viewTemplate = (componentName, componentNameCapitalized) =>
  `import { Wrapper } from "./${componentName}-style"

const ${componentNameCapitalized} = () => {
    return <Wrapper></Wrapper>
};

export default ${componentNameCapitalized};
    `;

export default viewTemplate;
