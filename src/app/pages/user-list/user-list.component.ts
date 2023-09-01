import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { UserListIntarface } from '../../modals/user_list.model';
import { AddUserComponent } from '../../components/popups/add-user/add-user.component';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

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

  selectedValue: string | undefined;
  checked3: boolean =false;

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
    var name = '';
    var page = '';

    if (this.search_user != undefined) {
      name = '?user_name=' + this.search_user;
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'user')
      .then((response: any) => {
        this.user_data = response.result.data;
        this.dataSource = this.dataSource = new MatTableDataSource(
          this.user_data
        );
      });
  }
  search(event: any) {
    this.search_user = event.target.value;

    this.getUserData();
  }
  toggleChanged(id:any,data:any){
    alert(id+"___"+data)
  }
}
