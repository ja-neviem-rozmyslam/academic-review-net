import {Component, OnInit} from '@angular/core';
import {BaseModal} from '../../../components/base-modal/entities/BaseModal';

@Component({
  selector: 'app-conference-create-modal',
  templateUrl: './conference-create-modal.component.html',
  styleUrl: './conference-create-modal.component.less'
})
export class ConferenceCreateModalComponent extends BaseModal implements OnInit{

  conference: any = {conferenceName: ''};

  ngOnInit(): void {
    console.log("ConferenceCreateModalComponent");
  }

}
