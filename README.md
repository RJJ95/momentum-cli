# Propulse

Propulse is a CLI tool to both kickstart your React project and accelerate your development experience.

## Install Propulse

You will need to run the following command to install Propulse globally on your system:

`npm install -g propulse`

You may need to install using admin priviliges. Run this command:

`sudo npm install -g propulse`

This will install Propulse globally, and enable you to initiate a project anywhere on your system.

## Create a project

To create a React project using Propulse, navigate to a directory and use the following command:

`propulse create [projectName]`

This will create a React project using the following tools:

- Create React App
- Styled Components
- React Router Dom
- Axios
- env-cmd

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
