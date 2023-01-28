import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Time } from "../../services/Time";

dayjs.extend(duration);

export abstract class Countdown {
  protected _element: HTMLElement;
  protected id = "";
  protected initial: number;
  protected current: number = 30 * 60;
  protected timeBetweenRestart: number;
  protected isStarted: boolean = false;
  protected intervalRef: NodeJS.Timer | number | null = null;

  constructor(id: string, initial: number, timeBetweenRestart: number) {
    this.id = id;
    this._element = document.getElementById(id) as HTMLElement;
    this.initial = initial;
    this.current = initial;

    if (timeBetweenRestart < 0) {
      throw new Error(
        "Le temps entre deux redémarrages ne peut pas être négatif"
      );
    }

    this.timeBetweenRestart = timeBetweenRestart;
  }

  public get timeLeft(): number {
    return this.current;
  }

  public get isRunning(): boolean {
    return this.isStarted;
  }

  public get element(): HTMLElement {
    return this.element;
  }

  public abstract restart(): void;
  /**
   * Cette fonction s'execute à la fin du temps prévu par le compteur
   * on peut donc agir en fin de compteur
   */
  protected abstract onCountdownEnd(): void;

  public start() {
    this._start();
    // on lance le compte à rebours toutes les secondes (1000ms) avec setInterval
    // on stocke la référence à l'interval dans une propriété pour pouvoir l'arrêter plus tard
    this.intervalRef = setInterval(this._start.bind(this), 1000);

    this.isStarted = true;
  }

  private _start() {
    if (!this._element) {
      throw new Error(`L'élément avec l'id ${this.id} n'existe pas`);
    }

    this._element.innerText = this.getFormattedTime();

    // si le temps est écoulé on arrête le compte à rebours
    if (this.current - 1 <= 0) {
      this.current = this.initial;
      return this.onCountdownEnd();
    }

    // sinon on décrémente le temps
    this.current -= 1;
  }

  public getFormattedTime() {
    let format = "mm:ss";

    if (this.current >= Time.HOUR) {
      format = "HH:mm:ss";
    }

    return dayjs.duration(this.current, "seconds").format(format);
  }

  public stop() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
    this.isStarted = false;
  }
}
