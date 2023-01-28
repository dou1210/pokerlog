import { Countdown } from "./Countdown";

export class BlindCountdown extends Countdown {
  protected name = "blind_countdown";

  public restart(): void {
    this.isRestarting = true;
    this.stop();
    this.current = this.initial;
    setTimeout(() => {
      this.start();
    }, this.timeBetweenRestart);
  }

  protected onCountdownEnd() {
    // on envoie un événement pour dire que le compte à rebours est terminé
    // on peut utiliser cet événement pour désactiver le bouton de démarrage
    const event = new Event("blind_countdown:end");
    document.dispatchEvent(event);

    // on arrête le compte à rebours et on réinitialise le temps
    this.restart();
  }
}
