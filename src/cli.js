import { addComponent } from "./add-component";

export function cli(args) {
  const command = args[2];

  switch (command) {
    case "add":
      return addComponent();
    default:
      return console.log("No correct arguments provided.");
  }
}
