import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.scss'],
})
export class VerifyPasswordComponent {
  constructor(private router: Router) {}

  btnSave() {
    this.router.navigate(['/confirm_password']);
  }
}
