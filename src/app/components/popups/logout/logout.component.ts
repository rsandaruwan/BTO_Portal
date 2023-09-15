import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tokestorageService } from 'src/app/services/token-storage.service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(
    private router: Router,
    public tokenStorage: tokestorageService
  ) {}

  logout() {
    this.tokenStorage.signOut();
    localStorage.clear();
    this.router.navigate(['']);
  }
}
