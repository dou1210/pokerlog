import { Countdown } from "./Countdown";

export class BreakCountdown extends Countdown {
  protected onCountdownEnd(): void {
    //
  }

  public restart(): void {
    this.stop();
    this.current = this.initial;

    setTimeout(() => {
      this.start();
    }, this.timeBetweenRestart);
  }
}
