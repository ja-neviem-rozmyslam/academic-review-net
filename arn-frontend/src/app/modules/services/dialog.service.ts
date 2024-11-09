import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type} from '@angular/core';
import {CONFIRM, DialogSettings, ERROR, INFO, WARNING} from '../components/dialog-component/entities/DialogSettings';
import {DialogComponent} from '../components/dialog-component/dialog.component';
import {Modal, ModalOptions} from 'flowbite';
import {BaseModal} from '../components/base-modal/entities/BaseModal';

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
    const componentRef = this.openCustomModal<DialogComponent>(DialogComponent);
    componentRef.instance.setDialogInstance(dialogSettings);
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
      dialogType: WARNING,
      content: warningMessage,
    });
  }

  openInfoDialog(infoTitle: string, infoMessage: string) {
    this.dialogInitialization({
      title: infoTitle,
      dialogType: INFO,
      content: infoMessage,
    });
  }

  openConfirmDialog(dialogTitle: string, confirmMessage: string, acceptCallback: () => void, buttonText?: {
    confirm: string;
    cancel: string
  }) {
    const dialogOptions: DialogSettings = {
      title: dialogTitle,
      dialogType: CONFIRM,
      content: confirmMessage,
      acceptCallback: acceptCallback,
    };

    if (buttonText) {
      dialogOptions.buttonText = buttonText;
    }

    this.dialogInitialization(dialogOptions);
  }

  openCustomModal<T extends BaseModal>(component: Type<T>, modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic'
  }): ComponentRef<T> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector) as ComponentRef<T>;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0];
    document.body.appendChild(domElem);
    const modalElement = domElem.querySelector('#default-modal');

    const {onHide: originalOnHide} = modalOptions;
    modalOptions.onHide = (modal) => {
      originalOnHide?.(modal);
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    };

    const modal = new Modal(modalElement, modalOptions);
    componentRef.instance.setModalInstance(modal);

    return componentRef;
  }
}
