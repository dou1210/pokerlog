import { Button } from "./Button";
import { Countdown } from "./Countdowns/Countdown";

export class StartBlindButton extends Button {
  constructor(id: string) {
    super(id);

    // On écoute l'évènement "blind_countdown:end" pour pouvoir désactiver le bouton
    document.addEventListener("blind_countdown:end", () => {
      this.disable();
    });

    // On écoute l'évènement "blind_countdown:restart" pour pouvoir réactiver le bouton
    document.addEventListener("blind_countdown:restart", () => {
      console.log("blind_countdown:restart");

      this.enable();
    });
  }

  /**
   * Cette fonction permet de desactiver le bouton
   */
  private disable() {
    const button = document.getElementById(this.id) as HTMLButtonElement;
    button.setAttribute("disabled", "1");
  }

  /**
   * Cette fonction permet d'activer le bouton
   */
  private enable() {
    const button = document.getElementById(this.id) as HTMLButtonElement;
    button.removeAttribute("disabled");
  }

  /**
   * Cette fonction permet d'écouter le click sur le bouton pour démarrer le compte à rebours
   * ou le stopper si il est déjà démarré et de changer le texte du bouton en fonction
   * @param countdown Le compteur à démarrer
   */

  public listenToClick(countdown: Countdown): void {
    const element = document.getElementById(this.id);

    if (!element) {
      throw new Error(`L'élément avec l'id ${this.id} n'existe pas`);
    }

    element.addEventListener("click", () => {
      if (countdown.isRunning) {
        countdown.stop();
        element.innerText = "Démarrer";
        return;
      }

      countdown.start();
      element.innerText = "Pause";
    });
  }
}
