import { config } from "../../config";
import { Chair } from "../Chair";
import { Player } from "../Player";
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

      const tableName = prompt("Quel est le nom de la table?");

      const numberOfPlayers = prompt("Combien de joueurs voulez vous ajouter?");
      let convertedNumberOfPlayers = Number(numberOfPlayers);
      convertedNumberOfPlayers =
        convertedNumberOfPlayers > config.tableDefaultNumberOfChairs
          ? config.tableDefaultNumberOfChairs
          : convertedNumberOfPlayers;

      const chairs = [];

      for (let i = 1; i <= convertedNumberOfPlayers; i++) {
        const chair = new Chair();
        const playerNumber = i === 1 ? `1er` : `${i}ème`;

        const playerName = prompt(`Quel est le nom du ${playerNumber} joueur`);

        if (!playerName) {
          i--;
          continue;
        }

        const player = new Player(playerName);
        player.sit(chair);

        chairs.push(chair);
      }

      new Table(tablesContainerElement, tableName, chairs).addToGame();
    });
  }
}
