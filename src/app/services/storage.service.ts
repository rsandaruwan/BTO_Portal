import { Injectable } from '@angular/core';

const TOKEN_KEY = 'userToken';
const USER_KEY = 'authUser';
const ROUTES_KEY = 'userRoutes';
const SECTION_KEY = 'selectedSection';
const REMEMBER_KEY = 'rememberMe';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  signOut(): void {
    // window.sessionStorage.clear();
    // window.localStorage.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(ROUTES_KEY);
    window.sessionStorage.removeItem(SECTION_KEY);
  }

  //Token
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  //User
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  //User Routes
  public saveRoutes(routes: any): void {
    window.sessionStorage.removeItem(ROUTES_KEY);
    window.sessionStorage.setItem(ROUTES_KEY, JSON.stringify(routes));
  }
  public getRoutes(): any {
    const routes = window.sessionStorage.getItem(ROUTES_KEY);
    if (routes) {
      return JSON.parse(routes);
    }
    return {};
  }

  //Side Nav Selected Section
  public saveSelectedSection(section_id: any): void {
    window.sessionStorage.removeItem(SECTION_KEY);
    window.sessionStorage.setItem(SECTION_KEY, JSON.stringify(section_id));
  }
  public getSelectedSection(): any {
    const section = window.sessionStorage.getItem(SECTION_KEY);
    if (section) {
      return JSON.parse(section);
    }
    return {};
  }

  //RememberMe
  public saveRememberMe(data: any): void {
    window.sessionStorage.removeItem(REMEMBER_KEY);
    window.sessionStorage.setItem(REMEMBER_KEY, JSON.stringify(data));
  }

  public getRememberMe(): any {
    const section = window.sessionStorage.getItem(REMEMBER_KEY);
    if (section) {
      return JSON.parse(section);
    } else {
      return undefined;
    }
  }

  public removeRememberMe(): void {
    window.sessionStorage.removeItem(REMEMBER_KEY);
  }
}
