import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TabOption } from './entities/TabOption';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @Input() tabs: TabOption[] = [];
  @Input() activeTab: string;
  @Output() tabChanged = new EventEmitter<string>();

  setActiveTab(value: string): void {
    this.activeTab = value;
    this.tabChanged.emit(value);
  }
}
