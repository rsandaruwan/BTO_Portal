import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {

  constructor(private router: Router) {}

  btnSave() {
    
    this.router.navigate(['/verify_password']);
  }
}
