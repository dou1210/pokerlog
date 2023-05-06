import { config } from '../config';
import { Random } from '../services/Random';
import { Chair } from './Chair';

export class Table {
  protected chairs: Chair[] = [];

  private _tableHash: string = 'tableHash';
  private _containerElement: HTMLElement;

  public get hash(): string {
    return this._tableHash;
  }

  constructor(containerElement: HTMLElement, name?: string | null, chairs?: Chair[]) {
    this._containerElement = containerElement;
    this._tableHash = name || Random.id();

    if (!chairs) {
      return;
    }

    this.chairs = chairs;
  }

  public render(): this {
    const tableTemplate = document.getElementById(
      'table-template',
    ) as HTMLTemplateElement | null;

    if (!tableTemplate) {
      throw new Error('Table template not found');
    }

    const tableTemplateElementContent = tableTemplate.content.cloneNode(
      true,
    ) as HTMLElement;

    const tableContainerElement = tableTemplateElementContent.querySelector(
      '.table-container',
    ) as HTMLElement;
    tableContainerElement.setAttribute('data-table-number', this._tableHash);

    const tableElement = tableTemplateElementContent.querySelector(
      '.table',
    ) as HTMLElement;

    const tableNameElement = document.createElement('span');
    tableNameElement.className = 'table-name';
    tableNameElement.textContent = this._tableHash;

    tableElement.addEventListener('click', this.remove);

    tableElement.append(tableNameElement);

    if (this.chairs.length) {
      const placedChairs: number[] = [];

      this.chairs.forEach((chair) => {
        let randomChairNumber = Random.number(1, config.tableDefaultNumberOfChairs);

        while (placedChairs.includes(randomChairNumber)) {
          randomChairNumber = Random.number(1, config.tableDefaultNumberOfChairs);
        }

        chair.classNames.push(`chair-${randomChairNumber}`);
        placedChairs.push(randomChairNumber);

        const chairElement = chair.render();
        tableElement.insertAdjacentElement('beforebegin', chairElement);
      });

      this._containerElement.appendChild(tableTemplateElementContent);

      return this;
    }

    for (let i = 0; i < config.tableDefaultNumberOfChairs; i++) {
      const chair = new Chair(this._tableHash);
      chair.classNames.push(`chair-${i + 1}`);
      const chairElement = chair.render();
      tableElement.insertAdjacentElement('beforebegin', chairElement);
    }

    this._containerElement.appendChild(tableTemplateElementContent);

    return this;
  }

  public addChair(chair: Chair): this {
    this.chairs.push(chair);
    this.render();

    return this;
  }

  public getChairs(): Chair[] {
    return this.chairs;
  }

  public getChair(index: number): Chair {
    return this.chairs[index];
  }

  public removeChair(index: number): this {
    this.chairs.splice(index, 1);
    this.render();

    return this;
  }

  public removeAllChairs(): this {
    this.chairs = [];

    return this;
  }

  public getChairCount(): number {
    return this.chairs.length;
  }

  public addToGame() {
    this.render();
    return this;
  }

  public remove = (event: Event) => {
    console.log('supprimer table');
    event.stopPropagation();

    const shouldRemoveTable = confirm(
      `Voulez vous vraiment supprimer la table "${this._tableHash}"?`,
    );

    if (!shouldRemoveTable) return;

    const chairs = this.chairs;

    // dispersion des joueurs sur les autres tables
    chairs.forEach((chair) => {
      // on récupère les tables qui ne sont pas celle sur laquelle on est
      const otherTables = document.querySelectorAll(
        `.table-container:not([data-table-number="${this._tableHash}"])`,
      );

      // on récupère une table au hasard
      const randomTable = otherTables[Random.number(0, otherTables.length - 1)];

      // on récupère les chaises de la table
      const tableChairs = randomTable.querySelectorAll('.chair');

      // on récupère une chaise au hasard
      const randomChair = tableChairs[Random.number(0, tableChairs.length - 1)];

      // on ajoute le joueur à la chaise
    });

    const tableElement = event.currentTarget as HTMLElement;
    tableElement.closest('.table-container')?.remove();
  };
}
