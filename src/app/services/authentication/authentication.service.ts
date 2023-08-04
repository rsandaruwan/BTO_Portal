import { Injectable } from '@angular/core';
import { ApplicationService } from '../application.service.service';
// import routingConf from '../../../routing-conf.json';

export interface routeGroup {
  case_name: string,
  group_name: string,
  route: string,
  role: string,
  childen: routeGroup[]
}

export interface appRoutes {
  route: string,
  role: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authRoutes: routeGroup[] | undefined;
  appRoutes: appRoutes[] | undefined;

  constructor(
    private applicationService: ApplicationService
  ) {
  }

  private isAuthenticated: boolean = false;

  public isRouteAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public setIsAuthenticated(isAuth: boolean): void {
    this.isAuthenticated = isAuth;
  }
}
