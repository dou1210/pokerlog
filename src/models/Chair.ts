import { Player } from "./Player";

export class Chair {
  protected isOccupied: boolean = false;
  private _player: Player | null = null;

  constructor(player?: Player) {
    this.isOccupied = !!player;
  }

  public get occupied(): boolean {
    return this.isOccupied;
  }

  public get player(): Player | null {
    return this._player;
  }

  public affectPlayer(player: Player): void {
    this._player = player;
    this.isOccupied = true;
  }
}
