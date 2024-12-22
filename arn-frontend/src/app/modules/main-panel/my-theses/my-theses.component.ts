import { Component, OnInit } from '@angular/core';
import { ConferenceStore } from '../conference-page/store/conferences-store.service';
import { ActivatedRoute } from '@angular/router';
import { MyThesis } from './entities/MyThesis';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-theses',
  templateUrl: './my-theses.component.html',
  styleUrl: './my-theses.component.less'
})
export class MyThesesComponent implements OnInit {

  theses$: Observable<MyThesis[]>;
  thesisCategories$ = this.conferenceStore.thesisCategories$;

  constructor(private route: ActivatedRoute,
              private conferenceStore: ConferenceStore) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const closed = params['closed'] === 'true';
      if (params['type'] === 'review') {
        this.conferenceStore.initMyThesesForReview();
      } else {
        this.conferenceStore.initMyTheses();
      }
      this.theses$ = this.conferenceStore.getThesesFiltered$(params['type'] || 'uploaded', closed);
    });
    this.conferenceStore.initThesisCategories();
  }
}
