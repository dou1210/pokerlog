import { config } from "../config";
import { Random } from "../services/Random";
import { Chair } from "./Chair";

export class Player {
  protected _id: string = Random.id();
  protected _name: string;
  protected _chips: number = 0;
  protected _chair: Chair | null = null;

  constructor(name: string, chips?: number) {
    this._name = name;

    if (!chips) {
      this._chips = config.startingChips;
    }
  }

  public get name(): string {
    return this._name;
  }

  public get chips(): number {
    return this._chips;
  }

  public get chair(): Chair | null {
    return this._chair;
  }

  public set chair(chair: Chair | null) {
    this._chair = chair;
  }

  public addChips(chips: number): void {
    this._chips += chips;
  }

  public removeChips(chips: number): void {
    this._chips -= chips;
  }

  public removeAllChips(): void {
    this._chips = 0;
  }

  public sit(chair: Chair): void {
    this._chair = chair;
    this._chair.affectPlayer(this);
  }
}
