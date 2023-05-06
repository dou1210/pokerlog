import { ClosePlayerListButton } from '../Buttons/ClosePlayerListButton';
import { Dialog } from './Dialog';

export class PlayerListDialog extends Dialog {
  constructor(id: string) {
    super(id);

    this.init();
  }

  private init() {
    new ClosePlayerListButton(this);
  }
}
