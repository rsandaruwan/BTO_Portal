import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  remember_me_checked = false;
  remember_email = '';
  remember_password = '';
  errors: any = [];
  resultArray: { type: string; msg: string }[] = [];
  error_title: any;
  final_massage: any;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    const data = this.storageService.getRememberMe();
    if (data) {
      this.remember_me_checked = true;

      this.remember_email = data.email;
      this.remember_password = data.password;
    } else {
      this.remember_me_checked = false;
    }
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  login() {
    this.resultArray=[]
    const data = {
      username: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };
    this.apiService

      .Login(data, '', 'user/login')
      .then((response: any) => {
  
        this.storageService.saveToken(response.result.token);
        this.storageService.saveUser(response.result);
        this.storageService.saveSelectedSection(0);

        this.router.navigate(['portal/dashboard']);

        if (this.remember_me_checked) {
          this.storageService.saveRememberMe(data);
        } else {
          this.storageService.removeRememberMe();
        }
        /*
        if (response.data[0].role_info) {
          var has_access = false;
          var has_details = false;

          for (var i = 0; i < response.data[0].role_info.length; i++) {
            // Loop through the user role to validate if user has access to the portal
            if (response.data[0].role_info[i].portal_use) {
              // If user role has access to the portal
              has_access = true;
              break;
            }
          }

          if (has_access) {
            if (!response.data[0].user_details) {
              this.router.navigate(['portal/profile']);
            } else {
              this.getMainRoute(response.data[0].token);
            }
          } else {
            // If the code comes here it means the user has no portal access
            this.errors.push('User does not have access to the portal.!');
            // this.toste.error(this.errors);
          }
        } */
      })
      .catch((error: any) => {
      

        if (error.error.message) {
          this.final_massage = error.error.message;
        } else {
          error.error.detail.forEach((item: any) => {
            if (item.loc && item.loc[1] && item.msg) {
              this.resultArray.push({
                type: item.loc[1],
                msg: item.msg,
              });
            }
          });
        }
      });
  }

  getMainRoute(userToken: string) {
    this.apiService
      .get(userToken, 'ui-path/my-routes')
      .then((response: any): any => {
        if (response.data.length > 0) {
          this.storageService.saveRoutes(response.data);

          this.router.navigate(['/portal/dashboard']);
        }
      })
      .catch((error: any) => {});
  }
}
