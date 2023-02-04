import { AddTableButton } from "../Buttons/AddTableButton";
import { CloseMenuButton } from "../Buttons/CloseMenuButton";
import { Table } from "../Table";
import { Dialog } from "./Dialog";

export class MenuDialog extends Dialog {
  constructor(id: string) {
    super(id);

    this.init();
  }

  private init() {
    new CloseMenuButton(this);
    new AddTableButton();

    const tablesContainerElement =
      document.querySelector<HTMLDivElement>(".tables-container");

    if (!tablesContainerElement) return;

    new Table(tablesContainerElement).addToGame();
  }
}
