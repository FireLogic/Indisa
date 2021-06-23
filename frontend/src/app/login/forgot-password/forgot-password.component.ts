import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public authService: AuthService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FA8BFF';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage =
      'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)';
  }

}
