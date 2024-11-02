import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Type} from '@angular/core';
import {DialogSettings, ERROR} from '../components/dialog-component/entities/DialogSettings';
import {DialogComponent} from '../components/dialog-component/dialog.component';
import {Modal, ModalOptions} from 'flowbite';
import {BaseModalComponent} from '../components/base-modal/base-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver, //TODO: ViewContainerRef
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  private dialogInitialization(dialogSettings: DialogSettings) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(DialogComponent)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0];
    document.body.appendChild(domElem);

    const modal = new Modal(domElem, {
      placement: 'center',
      onHide: () => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      },
    });
    componentRef.instance.setDialogInstance(modal, dialogSettings);
  }

  openErrorDialog(errorMessage: string) {
    this.dialogInitialization({
      title: 'Chyba',
      dialogType: ERROR,
      content: errorMessage,
    });
  }

  openWarningDialog(warningMessage: string) {
    this.dialogInitialization({
      title: 'Varovanie',
      dialogType: 'warning',
      content: warningMessage,
    });
  }

  openInfoDialog(infoTitle: string, infoMessage: string) {
    this.dialogInitialization({
      title: infoTitle,
      dialogType: 'info',
      content: infoMessage,
    });
  }

  openConfirmDialog(dialogTitle: string, confirmMessage: string, acceptCallback: () => void, buttonText?: { confirm: string; cancel: string }) {
    const dialogOptions: DialogSettings = {
      title: dialogTitle,
      dialogType: 'confirm',
      content: confirmMessage,
      acceptCallback: acceptCallback,
    };

    if (buttonText) {
      dialogOptions.buttonText = buttonText;
    }

    this.dialogInitialization(dialogOptions);
  }

  openCustomModal<T extends BaseModalComponent>(component: Type<T>, modalOptions: ModalOptions = { placement: 'center', backdrop: 'dynamic' }) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0];
    document.body.appendChild(domElem);

    const { onHide: originalOnHide } = modalOptions;
    modalOptions.onHide = (modal) => {
      originalOnHide?.(modal);
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };

    const modal = new Modal(domElem, modalOptions);
    componentRef.instance.setModalInstance(modal);

    modal.show();
  }
}
