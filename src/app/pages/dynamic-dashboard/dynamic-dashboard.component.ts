
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service.service'; 

import { tokestorageService } from 'src/app/services/token-storage.service.service'; 
import { CommonStorageService } from 'src/app/services/common-storage.service'; 
import { routeNavGroupInterface } from 'src/app/modals/route-nav.modal';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDrawerMode } from '@angular/material/sidenav';
import { NavItem } from 'src/app/modals/side_nav.model';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/components/popups/logout/logout.component';
@Component({
  selector: 'app-dynamic-dashboard',
  templateUrl: './dynamic-dashboard.component.html',
  styleUrls: ['./dynamic-dashboard.component.scss']
})
export class DynamicDashboardComponent {

  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer | undefined;
  @ViewChild('sidebarmenu') sidebarmenu: MatSidenav | undefined;
  @ViewChild('sidebarmenu') sidename_mod: MatDrawerMode | undefined;

  
  menu: NavItem [] = [
         
    {
      displayName: 'Product categories',
      iconName: '../../../assets/icons/p_category.png',          
      children: [
        {
          displayName: 'Categories ',
          iconName: '',
          route: '/portal/categories',
        },
        { 
          displayName: 'Sub Categories',
          iconName: '',
          route: '/portal/sub_categories'
        }
      ]
    },
    {
      displayName: 'Products',
      iconName: '../../../assets/icons/product.png ',
      route: '/portal/product',
    },        
    {
      displayName: 'Attributes',
      iconName: '../../../assets/icons/attribute.png',
      route: '/portal/attributes',
    },
    {
      displayName: 'Ingredients',
      iconName: '../../../assets/icons/recipes.png',
      route: '/portal/recipes',
    },        
    {
      displayName: 'Recipes',
      iconName: '../../../assets/icons/recipes.png',
      route: '/portal/recipes',
    },
    {
      displayName: 'Orders',
      iconName: '../../../assets/icons/orders.png',          
      children: [
        {
          displayName: 'Order',
          iconName: '',
          route: '/portal/order'
        },
        { 
          displayName: 'Customer',
          iconName: '',
          route: '/portal/customer'
        }
      ]
    },
    {
      displayName: 'Users',
      iconName: '../../../assets/icons/users.png',          
      children: [
        {
          displayName: '  User list',
          iconName: '',
          route: '/portal/user_list'
        },
        { 
          displayName: 'User Roles',
          iconName: '',
          route: '/portal/user_roles'
        },
        { 
          displayName: 'Permissions',
          iconName: '',
          route: '/portal/permission'
        },

      ]
    },
    {
      displayName: 'Profile',
      iconName: '../../../assets/icons/profile.png',
      route: '/portal/profile',
    },        
    {
      displayName: 'Logout',
      iconName: '../../../assets/icons/logout.png',
      route: 'logour_popup()',
    },
  ];


  navRouteList: routeNavGroupInterface[] = [];

  userName: string = String(localStorage.getItem("portcityUserFirstName"));
  userRole: string = this.tokenStorage.getRole()['name'];
  user_img: string = this.tokenStorage.getUser()['user_img'];
  selectedNavItem: number = 0;
  selectedSubNavItem: number=0;

  version: string = '1.0';

  mainMenuItemName: string = 'Dashboard';
  subMainMenuItemName: string = '';

  portCityTotalCapacity: number = 0;
  currentPopulation: number = 0;

  isDashboardEditable: boolean = false;

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private applicationService: ApplicationService,
    public tokenStorage: tokestorageService,
    public commonStorage: CommonStorageService,

    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,

  ) {
    //this.setNavigation()
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

   

  }

  ngAfterContentInit() {
    // this.getPortCityTotalCapacity();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // true for mobile device
      
      this.sidename_mod = 'over';
      // this.sidebarmenu.mode = 'over';
    } else {
      // false for not mobile device
    

      this.sidename_mod = 'side';
      // this.sidebarmenu.mode = 'side';
    }
  }



  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  selectMenuItem(routePath: string, routeName: string, subRouteName: string, sidebarEvent: any, mainIndex: number, subIndex: number, istoggle: boolean) {
if(this.sidenavContainer && this.sidebarmenu)
    if (routePath.length !== 0) {
      this.selectedNavItem = mainIndex;
      this.selectedSubNavItem = subIndex;
      this.mainMenuItemName = routeName;
      this.subMainMenuItemName = subRouteName;
      this.sidenavContainer.open();
      if (istoggle) {
        this.sidebarmenu.toggle()
      }
      if (routePath !== 'dashboard') {
        this.router.navigate(['dashboard/' + routePath]);
      }
      if (routePath == 'dashboard') {
        this.router.navigate(['dashboard']);
      }
    }

  }

  // getPortCityTotalCapacity() {
  //   this.applicationService.get("", "facility-manager/get-total-capacity", "").then((response: any) => {
  //     this.portCityTotalCapacity = response.result[0].port_city_capacity;
  //   }).catch((error: any) => {
   
  //   })
  // }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 720) {
      return true;
    } else {
      return false;
    }
  }

  setNavigation() {

    this.navRouteList = []

    this.applicationService.get(String(this.tokenStorage.getToken()), "ui-routes/", "").then((response: any): any => {
      var res = []
      res = response.result;
      res.map((route: routeNavGroupInterface) => {
        if (route.navigation) {
          this.navRouteList.push(route)
        }
      })
      this.selectMenuItem(String(this.commonStorage.getMainRoute()).toLocaleLowerCase(), String(this.commonStorage.getMainRouteName()), '', '', 0, 0, false)
    }).then(() => {
      this.getCurrentPopulation();
    })
  }

  getCurrentPopulation() {
    this.applicationService.get(String(this.tokenStorage.getToken()), "visit/current-population", "").then((response: any) => {
      this.currentPopulation = response.result;
      this.commonStorage.saveCurrentPopulation(response.result);
    }).catch((error: any) => {
    
    })
  }

  logout() {
    this.tokenStorage.signOut();
    localStorage.clear();
    this.router.navigate(['']);
  }


  logour_popup(){
    const dialogRef = this.dialog.open(LogoutComponent);    
    dialogRef.afterClosed().subscribe(result => {
    
      
    });

  }
}
