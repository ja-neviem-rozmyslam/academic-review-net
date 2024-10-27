// arn-frontend/src/app/modules/components/dialog-service/dialog.service.ts
import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import {Modal} from 'flowbite';
import {DialogComponent} from './dialog-component/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal: Modal | null = null;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  openModal() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.modal = new Modal(domElem);
    this.modal.show();
  }

  closeModal() {
    if (this.modal) {
      this.modal.hide();
      this.modal = null;
    }
  }
}
