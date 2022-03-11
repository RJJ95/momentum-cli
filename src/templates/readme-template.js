const readmeTemplate = () => `# React Boilerplate
 
This project has been kickstarted using Propulse.
 
## Used packages
 
- Styled Components
- React Router
- Axios
 
## Getting started
 
To get this project running, follow the steps described below:
 
1. Run "npm start" to spin up the development server
 
You can start live coding when the development server started. This means that your code will update the UI when you hit save.
 
### Plugins
 
When using Visual Studio Code, it's (strongly) advised to install the following plugins from the Marketplace:
 
- Prettier - Code formatter (esbenp.prettier-vscode)
- Simple React Snippets (burkeholland.simple-react-snippets)
- styled-components-snippets (jonkwheeler.styled-components-snippets)
- vscode-styled-components (mf.vscode-styled-components)
 
## Project Structure
 
This project has an opiniated folder structure.
 
- node_module --- Houses all of your installed packages.
- public --- Houses all of the public HTML files.
- src --- Very important folder. Houses all/most of our Javascript code.
  - api --- All of our API stuff is in here.
  - components --- All components are in here. Our app consists mostly of components, in all theur forms and epic glory.
    - constructs --- Constructs are components which are constructed of other components. These can be primitives and other constructs.
    - functionals --- Functionals are components which are not presented in the UI, but are still components.
    - pages --- Please make an educated guess.
    - primitives --- These are the smallest components. They consist of nothing other than a single element.
    - sections --- Sections are big chunks of a page. They can consist of primitives, and constructs.
  - config --- The config folder houses configuration files. These are mostly arrays with objects in them.
  - media --- Media houses all media of the project.
    - documents --- Test documents which we can use.
    - icons --- Icons which we can use in the primary menu, or anywhere else. These are almost always .svg files.
    - images --- Any images we need are stored here.
    - texts --- Not sure about this one. It's a good practice to house our texts somewhere in case we're going multi-lingual.
  - state --- The state folder houses our application state on a global/application level. Language is a good example. We need it for our entire application.
  - styles --- Hosts global styles, like theme and global-styles.
  - utils --- Utils is a folder where we can store our utility functions which can serve in multiple places.
 
Enjoy coding!

`;

export default readmeTemplate;
