
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate, CanLoad, UrlTree, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application.service.service';
import { AuthenticationService } from './authentication.service';
import { routeGroup } from 'src/app/modals/route-group.model';
import { tokestorageService } from '../token-storage.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  authRoutes: routeGroup[] | undefined;
  finded: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private applicationService: ApplicationService,
    private tokenStorage: tokestorageService
  ) { 
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isRouteAuthenticated()) {
      this.applicationService.get(String(this.tokenStorage.getToken()), "ui-routes/", "").then((response: any): any => {
        this.authRoutes = response.result;
        if(this.authRoutes)
        this.finded = this.authRoutes.find(authRoute => authRoute.case_name === route.data['routeName']);
        if (!this.finded) {
          this.router.navigate(['unauthorized']);
          return false;
        }
      }).catch((error: any) => {
   
      })
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

}