import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-verify-page',
  template: ''
})
export class VerifyPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const status = params.get('status');
      const message = status === 'success' ? 'Overenie vášho účtu prebehlo úspešne'
        : 'Overenie vášho účtu zlyhalo \n Platnosť odkazu vypršala';
      this.router.navigate(['/login'], {
        state: {
          status: status,
          message: message
        }
      } as NavigationExtras);
    });
  }
}
