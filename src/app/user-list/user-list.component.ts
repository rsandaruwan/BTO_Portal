import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { UserListIntarface } from '../modals/user_list.model';
import { AddUserComponent } from '../components/popups/add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  selectedValue: string | undefined;
  checked3: boolean | undefined;

  displayedColumns: string[] = ['user_name', 'user_email','contact', 'user_role', 'user_status', 'action'];

  dataSource: MatTableDataSource<UserListIntarface>;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: UserListIntarface[] = [
    {
      user_name: 'Saman kasun',
      user_email: 'sandarurcs@gmail.com',
      contact: '0775123458',
      user_role: 'Administrator',
      user_status: 'Active',
      action: ''
    },
    {
      user_name: 'Saman kasun',
      user_email: 'sandarurcs@gmail.com',
      contact: '0775123458',
      user_role: 'Administrator',
      user_status: 'Inactive',
      action: ''
    },
    {
      user_name: 'Saman kasun',
      user_email: 'sandarurcs@gmail.com',
      contact: '0775123458',
      user_role: 'Administrator',
      user_status: 'Inactive',
      action: ''
    },
    {
      user_name: 'Saman kasun',
      user_email: 'sandarurcs@gmail.com',
      contact: '0775123458',
      user_role: 'Administrator',
      user_status: 'Active',
      action: ''
    },
   
   
  ];

  openAttribute(){
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,
    });
  }
  addUser(){
    this.dialog.open(AddUserComponent, {

    });
  }
}

