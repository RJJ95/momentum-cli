const routerTemplate = () => `import { FC } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";

const Router: FC = (): JSX.Element => {
  const routing = useRoutes(routes());

  return <>{routing}</>;
};

export default Router;
`;

export default routerTemplate;
