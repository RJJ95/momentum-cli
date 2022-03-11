# Propulse

Propulse is a CLI tool to both kickstart your React project and accelerate your development experience.

## Create a project

To create a React project using Propulse, navigate to a directory and use the following command:

`propulse create [project name]`

This will create a React project using the following tools:

- Create React App
- Styled Components
- React Router Dom
- Axios

The folder structure will also be set in a way so that you can use Propulse to add components on the fly.

## Add a component

To add a component to your application, use the following command:

`propulse add`

This will result in an inquiry about the type of component you want to add, and asks you for the name of your new coponent.

The type of components Propulse supports are:

- primitives (smallest of components)
- constructs (built of primitives and/or other constructs)
- sections (big pieces of a page)
- pages (just a page)
- functionals (components which have functional meaning, but no appearance on the screen)
