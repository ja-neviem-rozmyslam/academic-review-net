export class ModalSettings {
  title?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  hideCloseButton?: boolean;
  buttonText?: {
    confirm: string;
    cancel: string;
  };

  constructor() {
    this.title = '';
    this.showHeader = false;
    this.showFooter = false;
    this.hideCloseButton = false;
    this.buttonText = { confirm: 'Uložiť', cancel: 'Zrušiť' };
  }
}
