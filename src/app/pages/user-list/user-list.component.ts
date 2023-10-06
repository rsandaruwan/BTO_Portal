import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { UserListIntarface } from '../../modals/user_list.model';
import { AddUserComponent } from '../../components/popups/add-user/add-user.component';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { DynamicConfirmationPopupComponent } from 'src/app/components/popups/dynamic-confirmation-popup/dynamic-confirmation-popup.component';
import { DynamicDonePopupComponent } from 'src/app/components/popups/dynamic-done-popup/dynamic-done-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  search_user: any;
  user_data: any;
  user_status_id: any;
  selectedPageSize: number = 10;

  skip: any = 0;
  count: number = 0;

  selectedValue: string | undefined;
  checked3: boolean = false;

  displayedColumns: string[] = [
    'first_name',
    'email',
    'mobile',
    'user_role',
    'user_status',
    'action',
  ];

  dataSource: MatTableDataSource<UserListIntarface>;

  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getUserData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: UserListIntarface[] = [];

  openAttribute() {
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,
    });
  }
  addUser() {
    this.dialog.open(AddUserComponent, {});
  }

  getUserData() {
    var parameter = '?';

    if (this.search_user != undefined) {
      parameter += 'user_name=' + this.search_user+'&';
    }
    if (this.selectedPageSize != undefined) {
      parameter+= 'limit=' + this.selectedPageSize +'&';
    }
    if (this.skip != undefined) {
      parameter += 'skip=' + this.skip;
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'user'+ parameter)
      .then((response: any) => {
     
        this.user_data = response.result.data;
        this.count = response.result.page[0].count;
        this.dataSource = this.dataSource = new MatTableDataSource(
          this.user_data
        );

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  search(event: any) {
    this.search_user = event.target.value;

    

    this.getUserData();
  }
  onPageChange(event: PageEvent) {
    this.selectedPageSize = event.pageSize;
  
    this.skip = (event.pageIndex* this.selectedPageSize);
    this.paginator.length = this.count;
  }
  toggleChanged(id: any, data: any) {
  

    if (data == true) {
      this.user_status_id = '3';
    }
    if (data == false) {
      this.user_status_id = '2';
    }

    var update_data = { 
      user_id: id,
      user_status: this.user_status_id,
    };

    this.apiService
      .put(
        update_data,
        String(this.tokestorage.getToken()),
        'user/update/status'
      )
      .then((response: any) => {
        this.done();

        // this.updated();
      })
      .catch((error: any) => {});
  }

  editclick(id: any) {
    let dialogRef = this.dialog.open(AddUserComponent, {
      autoFocus: false,

      data: { id: id },
    });
  }

  suspend(id: any, data1: any):boolean {
   
    var data = {
      title: 'Suspend User',
      text: 'Are you sure you want suspend this user?',
      msg_type: 'warning',
      msg: "By Suspending this user you won’t be able to revert. Please ensure you're absolutely certain before proceeding.",
      positive_button: 'yes',
      negative_button: 'cancel',
    };
    var dialogRef = this.dialog.open(DynamicConfirmationPopupComponent, {
      width: '25vw',

      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
    
      if (result == 1) {
     this.toggleChanged(id,data1);
    
      }else{
        this.getUserData()
      }
    });
    return true;
  }

  done() {
    var data1 = {
      msg: 'Update status to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
    this.getUserData()
  }
}
