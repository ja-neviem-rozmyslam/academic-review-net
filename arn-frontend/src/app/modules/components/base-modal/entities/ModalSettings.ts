export class ModalSettings {
  title?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  buttonText?: {
    confirm: string;
    cancel: string;
  };

  constructor() {
    this.title = '';
    this.showHeader = true;
    this.showFooter = true;
    this.buttonText = { confirm: 'Uložiť', cancel: 'Zrušiť' };
  }
}
