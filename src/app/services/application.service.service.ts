import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokestorageService } from './token-storage.service.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokestorage: tokestorageService
  ) {
  }

  /**
   * Method: POST
   * Params: data, token, endpoint, options
  */
  async post(data: any, token: string, endpoint: string, options: any) {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json charset=utf-8',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.post(environment.baseURL + endpoint, data, customOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        if (error.status == 401) {
          this.tokenRefresh().then(() => {
            this.post(data, token, endpoint, options);
          })
        } else if (error.status == 403) {
          this.tokestorage.signOut();
          this.router.navigate(['']);
          rejects(error);
        } else if (error.status == 0) {
          this.router.navigate(['unknown-error'])
        } else {
          rejects(error);
        }
      })
    });
  }

  /**
   * Method: GET
   * Params: token, endpoint, options
  */
  async get(token: string, endpoint: string, options: any) {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.get(environment.baseURL + endpoint, customOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        if (error.status == 401) {
          this.tokenRefresh().then(() => {
            this.get(token, endpoint, options)
          })
        } else if (error.status == 403) {
          this.tokestorage.signOut();
          this.router.navigate(['']);
          rejects(error);
        } else if (error.status == 0) {
          this.router.navigate(['unknown-error'])
        } else {
          rejects(error);
        }
      })
    });
  }

  /**
  * Method: PUT
  * Params: data,token, endpoint, options
  */
  async put(data: any, token: string, endpoint: string, options: any) {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.put(environment.baseURL + endpoint, data, customOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        if (error.status == 401) {
          this.tokenRefresh().then(() => {
            this.put(data, token, endpoint, options);
          })
        } else if (error.status == 403) {
          this.tokestorage.signOut();
          this.router.navigate([''])
          rejects(error);
        } else if (error.status == 0) {
          this.router.navigate(['unknown-error'])
        } else {
          rejects(error);
        }
      })
    });
  }

  /**
* Method: DELETE
* Params: data,token, endpoint, options
*/
  async delete(token: string, endpoint: string, options: any) {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.delete(environment.baseURL + endpoint, customOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        if (error.status == 401) {
          this.tokenRefresh().then(() => {
            this.delete(token, endpoint, options);
          })
        } else if (error.status == 403) {
          this.tokestorage.signOut();
          this.router.navigate([''])
          rejects(error);
        } else if (error.status == 0) {
          this.router.navigate(['unknown-error'])
        } else {
          rejects(error);
        }
      })
    });
  }

  /**
  * Method: GET - TOKEN REFRESH
  * Params:
  */
  async tokenRefresh() {
    const customOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(this.tokestorage.getToken())
      })
    }
    return await new Promise((resolve, rejects) => {
      this.http.get(environment.baseURL + "user/refresh-token", customOptions).subscribe((data: any) => {
        this.tokestorage.saveToken(data.token);
        resolve(data);

      }, (error: any): any => {
        if (error.status == 401) {
          this.tokestorage.signOut();
          this.router.navigate(['']);
          return 0
        } else if (error.status == 403) {
          this.tokestorage.signOut();
          this.router.navigate(['']);
          rejects(error);
        } else {
          rejects(error);
        }
      })
    });
  }

}
