import { Countdown } from "./Countdown";

export class BlindCountdown extends Countdown {
  public restart(): void {
    this.stop();
    this.current = this.initial;
    setTimeout(() => {
      this.start();

      // on envoie un événement pour dire que le compte à rebours a été redémarré
      // on peut utiliser cet événement pour réactiver le bouton de démarrage
      const event = new Event("blind_countdown:restart");
      document.dispatchEvent(event);
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
