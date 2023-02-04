import { Player } from "./Player";

export class Chair {
  protected isOccupied: boolean = false;
  private _player: Player | null = null;
  private _element: HTMLDivElement;

  constructor(player?: Player) {
    this.isOccupied = !!player;

    if (player) {
      this._player = player;
    }

    this._element = document.createElement("div");
    this._element.classList.add("chair");

    if (this.isOccupied) {
      //
    }
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
    this.isOccupied = true;
  }
}
