const routerTemplate = () => `import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";

const Router = () => {
  const routing = useRoutes(routes());

  return <>{routing}</>;
};

export default Router;
`;

export default routerTemplate;
