import { MenuDialog } from "../Dialogs/MenuDialog";
import { Button } from "./Button";

export class MenuButton extends Button {
  public constructor() {
    super("menu-toggle");
  }

  public init() {
    const menuDialog = new MenuDialog("menu");

    this.element.addEventListener("click", () => {
      menuDialog.show();
    });
  }
}
