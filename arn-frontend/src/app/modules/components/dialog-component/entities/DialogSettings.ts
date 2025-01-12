export class DialogSettings {
  title: string;
  content: string;
  dialogType?: 'error' | 'warning' | 'confirm' | 'info';
  acceptCallback?: () => void;
  buttonText?: {
    confirm: string;
    cancel: string;
  };

}

export const ERROR = 'error';
export const WARNING = 'warning';
export const CONFIRM = 'confirm';
export const INFO = 'info';
