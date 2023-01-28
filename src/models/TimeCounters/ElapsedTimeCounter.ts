import { TimeCounter } from "./TimeCounter";

export class ElapsedTimeCounter extends TimeCounter {
  protected onCountdownEnd(): void {}
  public restart(): void {}
}
