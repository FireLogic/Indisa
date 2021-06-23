import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService,
    private elementRef: ElementRef,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    //this.elementRef.nativeElement.ownerDocument.body.style.cursor = 'default';
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  ngAfterViewInit() {
    //this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FA8BFF';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage =
      'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)';
  }

  SignIn(email, password) {
    //this.elementRef.nativeElement.ownerDocument.body.style.cursor = 'progress';
    this.authService.SignIn(email, password);
  }

}
