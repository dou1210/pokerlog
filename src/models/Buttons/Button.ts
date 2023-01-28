export class Button {
  protected id: string;
  protected element: HTMLButtonElement;

  constructor(id: string) {
    this.id = id;
    this.element = document.getElementById(this.id) as HTMLButtonElement;
  }
}
