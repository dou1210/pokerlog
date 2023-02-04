import { Dialog } from "../Dialogs/Dialog";
import { Button } from "./Button";

export class CloseMenuButton extends Button {
  private dialog: Dialog;

  public constructor(dialog: Dialog) {
    super("menu-close");

    this.dialog = dialog;
    this.init();
  }

  public init() {
    this.element.addEventListener("click", () => {
      this.dialog.hide();
    });
  }
}
