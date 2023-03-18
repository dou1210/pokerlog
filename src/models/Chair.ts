import { Player } from "./Player";

export class Chair {
  protected isOccupied: boolean = false;
  private _player: Player | null = null;
  private _element: HTMLDivElement;

  constructor(player?: Player) {
    this._element = document.createElement("div");
    this._element.classList.add("chair");

    this.isOccupied = !!player;

    if (player) {
      player.sit(this);
      this._player = player;
    }

    this._element.addEventListener("click", (e) => {
      if (this.isOccupied) return;

      const playerName = prompt("Entrez le nom du joueur");

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

  public get player(): Player | null {
    return this._player;
  }

  public render(): HTMLElement {
    return this._element;
  }

  public affectPlayer(player: Player): void {
    this._player = player;
    const playerMarkup = document.createElement("div");
    playerMarkup.textContent = player.name;
    this._element.append(playerMarkup);
    this.isOccupied = true;
  }
}
