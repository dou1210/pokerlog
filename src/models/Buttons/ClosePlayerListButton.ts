import { Dialog } from '../Dialogs/Dialog';
import { Button } from './Button';

export class ClosePlayerListButton extends Button {
  private dialog: Dialog;

  public constructor(dialog: Dialog) {
    super('players-list-close');

    this.dialog = dialog;
    this.init();
  }

  public init() {
    this.element.addEventListener('click', () => {
      this.dialog.hide();
    });
  }
}
