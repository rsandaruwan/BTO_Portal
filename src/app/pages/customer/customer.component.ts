import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { CustomerIntarface } from 'src/app/modals/customer.model';
import { OrderHistoryIntarface } from 'src/app/modals/order_history.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  selectedValue: string | undefined;

  displayedColumns: string[] = ['cus_name', 'cus_email', 'cus_contact'];
  displayedColumns1: string[] = ['ord_date', 'ord_amount', 'status'];
  dataSource: MatTableDataSource<CustomerIntarface>;
  dataSource1: MatTableDataSource<OrderHistoryIntarface>;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource1 = new MatTableDataSource(this.ELEMENT_DATA1);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: CustomerIntarface[] = [
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
    {
      cus_name: 'PID.01535',
      cus_email: 'Pure Ceylon Cinnamon Powder',
      cus_contact: '04456887513',
    },
  ];
  ELEMENT_DATA1: OrderHistoryIntarface[] = [
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
    {
      ord_date: 'PID.01535',
      ord_amount: 'Pure Ceylon Cinnamon Powder',
      status: '04456887513',
    },
  ];

  openAttribute() {
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,
    });
  }
}
