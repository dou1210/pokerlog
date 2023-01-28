import { Random } from "../services/Random";
import { Chair } from "./Chair";
import { Player } from "./Player";

export class Table {
  protected chairs: Chair[] = [
    new Chair(),
    new Chair(),
    new Chair(),
    new Chair(),
  ];

  private _tableHash: string = "tableHash";

  public get hash(): string {
    return this._tableHash;
  }

  constructor(name?: string, chairs?: Chair[]) {
    this._tableHash = name || Random.id();

    if (chairs) {
      this.chairs = chairs;
    }

    const player = new Player("Player 1");
    this.chairs[2].affectPlayer(player);
  }

  public addChair(chair: Chair): void {
    this.chairs.push(chair);
  }

  public getChairs(): Chair[] {
    return this.chairs;
  }

  public getChair(index: number): Chair {
    return this.chairs[index];
  }

  public removeChair(index: number): void {
    this.chairs.splice(index, 1);
  }

  public removeAllChairs(): void {
    this.chairs = [];
  }

  public getChairCount(): number {
    return this.chairs.length;
  }
}
