const primitiveTemplate = ({ componentName }) =>
  `import styled from "styled-components";

export const ${componentName} = styled.div\`
    
\`;
    
    `;

export default primitiveTemplate;
