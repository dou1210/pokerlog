import { config } from "../config";

export abstract class Blind {
  private static blinds = config.blinds;

  private static currentBlindIndex = 0;

  public static get currentBlind(): string {
    return this.blinds[this.currentBlindIndex];
  }

  public static get nextBlind(): string {
    return this.blinds[this.currentBlindIndex + 1];
  }

  public static next(): void {
    if (this.isLastBlind) {
      return;
    }

    const blindsValueElement = document.querySelector(".blinds-value");
    const nextBlindsValueElement = document.querySelector(".next-blind-value");

    if (!blindsValueElement || !nextBlindsValueElement) {
      throw new Error("L'élément avec la classe .blinds-value n'existe pas");
    }

    this.currentBlindIndex++;
    blindsValueElement.innerHTML = this.currentBlind;

    if (!this.nextBlind) {
      const nextBlindElement = document.getElementById("nextblind");

      if (nextBlindElement) {
        nextBlindElement.style.display = "none";
      }

      return;
    }

    nextBlindsValueElement.innerHTML = this.nextBlind;
  }

  public static previous(): void {
    this.currentBlindIndex--;
  }

  public static reset(): void {
    this.currentBlindIndex = 0;
  }

  public static get isLastBlind(): boolean {
    return this.currentBlindIndex === this.blinds.length - 1;
  }

  public static get isFirstBlind(): boolean {
    return this.currentBlindIndex === 0;
  }

  public static get blindsCount(): number {
    return this.blinds.length;
  }
}
