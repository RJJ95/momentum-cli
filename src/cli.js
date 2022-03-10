import addComponent from "./add-component";
import createProject from "./create-project";

export function cli(args) {
  const command = args[2];

  switch (command) {
    case "add":
      return addComponent();
    case "init":
      return createProject(args[3]);
    default:
      return console.log("No correct arguments provided.");
  }
}
