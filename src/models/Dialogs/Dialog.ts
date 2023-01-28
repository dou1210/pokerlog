export abstract class Dialog {
  protected id: string;
  protected withModal: boolean;
  protected dialog: HTMLDialogElement;

  constructor(id: string, withModal: boolean = true) {
    this.id = id;
    this.withModal = withModal;
    this.dialog = document.getElementById(this.id) as HTMLDialogElement;
  }

  public get element(): HTMLDialogElement {
    return this.dialog;
  }

  public show(): void {
    if (this.withModal) {
      return this.dialog.showModal();
    }

    this.dialog.show();
  }

  public hide(): void {
    this.dialog.close();
  }
}
