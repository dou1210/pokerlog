import { App } from '../App';
import { PlayerListDialog } from '../Dialogs/PlayerListDialog';
import { Button } from './Button';

export class PlayerListButton extends Button {
  public constructor() {
    super('players-list-toggle');
  }

  public init() {
    const playerListDialog = new PlayerListDialog('players-list');

    this.element.addEventListener('click', () => {
      playerListDialog.show();

      const dialogContentElement = playerListDialog.element.querySelector(
        '.players-list-container',
      );

      const playerList = App.playersInGame;

      if (!dialogContentElement) return;

      if (!playerList.length) {
        dialogContentElement.innerHTML = "<p>Aucun joueur n'est en jeu</p>";

        return;
      }

      let html = `<table>
        <thead>
          <tr>
            <th>Joueur</th>
            <th>Chips</th>
            <th>Table</th>
          </tr>
        </thead>
        <tbody>`;

      for (const player of playerList) {
        html += `<tr>
          <td>${player.name}</td>
          <td>${player.chips}</td>
          <td>${player.chair?.tableName}</td>
        </tr>`;
      }

      html += `</tbody></table>`;

      dialogContentElement.innerHTML = html;
    });
  }
}
