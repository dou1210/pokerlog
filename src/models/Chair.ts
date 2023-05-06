import { App } from './App';
import { Player } from './Player';
import { Table } from './Table';

export class Chair {
  protected isOccupied: boolean = false;
  private _player: Player | null = null;
  private _tableName: string;
  private _element: HTMLDivElement;
  public classNames: string[] = [];

  constructor(tableName: string, player?: Player) {
    this._element = document.createElement('div');
    this._element.classList.add('chair');

    this.isOccupied = !!player;
    this._tableName = tableName;

    if (player) {
      player.sit(this);
      this._player = player;
    }

    this._element.addEventListener('click', (e) => {
      if (this.isOccupied) {
        const removePlayer = confirm('Voulez-vous retirer le joueur de la chaise ?');

        if (removePlayer) {
          this.removePlayer();
        }

        return;
      }

      const playerName = prompt('Entrez le nom du joueur');

      if (!playerName) {
        return;
      }

      const player = new Player(playerName);
      player.sit(this);
      this._player = player;
    });
  }

  public get occupied(): boolean {
    return this.isOccupied;
  }

  public get tableName(): string {
    return this._tableName;
  }
  public get player(): Player | null {
    return this._player;
  }

  public render(): HTMLElement {
    this._element.classList.add(...this.classNames);
    return this._element;
  }

  public affectPlayer(player: Player): void {
    this._player = player;
    const playerMarkup = document.createElement('div');
    playerMarkup.textContent = player.name;
    this._element.append(playerMarkup);
    this.isOccupied = true;
  }

  public removePlayer(): void {
    if (this._player) App.removePlayerFromGame(this._player);

    this._player = null;
    this.isOccupied = false;
    this._element.innerHTML = '';
  }
}
