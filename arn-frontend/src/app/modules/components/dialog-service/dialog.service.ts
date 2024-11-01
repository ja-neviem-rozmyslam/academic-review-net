import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Type} from '@angular/core';
import {DialogOptions, ERROR} from './entities/DialogOptions';
import {DialogComponent} from './dialog-component/dialog.component';
import {Modal, ModalOptions} from 'flowbite';

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

  private dialogInitialization(dialogOptions: DialogOptions) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(DialogComponent)
      .create(this.injector);


    componentRef.instance.dialogOptions = dialogOptions;
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
    componentRef.instance.setModalInstance(modal);
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
    const dialogOptions: DialogOptions = {
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

  openCustomModal<T>(component: Type<T>, modalOptions: ModalOptions) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0];
    document.body.appendChild(domElem);

    const originalOnHide = modalOptions.onHide;
    modalOptions.onHide = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };

    const modal = new Modal(domElem, modalOptions);
    if ((componentRef.instance as any).setModalInstance) {
      (componentRef.instance as any).setModalInstance(modal);
    }

    modal.show();
  }
}
