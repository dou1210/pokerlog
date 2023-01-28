export abstract class Random {
  public static number(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public static id(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
