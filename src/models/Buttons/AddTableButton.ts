import { Table } from "../Table";
import { Button } from "./Button";

export class AddTableButton extends Button {
  public constructor() {
    super("add-table");

    this.init();
  }

  public init() {
    this.element.addEventListener("click", () => {
      const tablesContainerElement =
        document.querySelector<HTMLDivElement>(".tables-container");

      if (!tablesContainerElement) return;

      new Table(tablesContainerElement).addToGame();
    });
  }
}
