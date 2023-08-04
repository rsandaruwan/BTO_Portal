import { Injectable } from '@angular/core';

const TOKEN_KEY = 'back_to_originUserToken';
const USER_KEY = 'authUser';

const ROLE_KEY = 'userRole';


@Injectable({
    providedIn: 'root'
})
export class tokestorageService {

    constructor() { }

    signOut(): void {
        window.sessionStorage.clear();
        window.localStorage.clear();
    }

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

    public saveRole(role: any): void {
        window.sessionStorage.removeItem(ROLE_KEY);
        window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
    }

    public getRole(): any {
        const user = window.sessionStorage.getItem(ROLE_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }

}
