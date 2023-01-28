import { MenuDialog } from "../Dialogs/MenuDialog";
import { Button } from "./Button";

export class CloseMenuButton extends Button {
  public constructor() {
    super("menu-close");
  }

  public init() {
    const menuDialog = new MenuDialog("menu");

    this.element.addEventListener("click", () => {
      menuDialog.hide();
    });
  }
}
