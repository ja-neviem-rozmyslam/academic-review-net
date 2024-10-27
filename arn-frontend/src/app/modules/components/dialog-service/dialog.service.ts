import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import {DialogOptions, ERROR} from './entities/DialogOptions';
import {DialogComponent} from './dialog-component/dialog.component';
import {Modal} from 'flowbite';

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

  openConfirmDialog(dialogTitle: string,confirmMessage: string, acceptCallback: () => void) {
    this.dialogInitialization({
      title: dialogTitle,
      dialogType: 'confirm',
      content: confirmMessage,
      acceptCallback: acceptCallback,
    });
  }
}
