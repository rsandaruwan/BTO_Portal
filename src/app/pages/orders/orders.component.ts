import { Component, ViewChild, EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderInterface } from 'src/app/modals/order.model';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {

  


 

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  checked: boolean | undefined;
  selectedValue: string | undefined;

  displayedColumns: string[] = [
    'order_id',
    'order_date',
    'delivery_date',
    'customers',
    'payment_status',
    'amount',
    'order_status',
    'action',
  ];
  dataSource: MatTableDataSource<OrderInterface>;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  ELEMENT_DATA: OrderInterface[] = [
    {
      order_id: 'RID_01535',
      order_date: 'Mildly Spiced Curry Chicken',
      delivery_date: 'Spices',
      customers: '1',
      payment_status: '1',
      amount: '1',
      order_status: 1,
      action: 'yuiy',
    },
    {
      order_id: 'RID_01535',
      order_date: 'Mildly Spiced Curry Chicken',
      delivery_date: 'Spices',
      customers: '1',
      payment_status: '1',
      amount: '1',
      order_status: 2,
      action: 'yuiy',
    },
    {
      order_id: 'RID_01535',
      order_date: 'Mildly Spiced Curry Chicken',
      delivery_date: 'Spices',
      customers: '1',
      payment_status: '1',
      amount: '1',
      order_status: 3,
      action: 'yuiy',
    },
    {
      order_id: 'RID_01535',
      order_date: 'Mildly Spiced Curry Chicken',
      delivery_date: 'Spices',
      customers: '1',
      payment_status: '1',
      amount: '1',
      order_status: 4,
      action: 'yuiy',
    },
  ];

  getStatus(status_id: number): any {

    switch (status_id) {
      case 1:
        return {
          status_wording: 'Pending',
          status_color: '#5F4C2B',
          text_color: '#F6B749',
        };
      case 2:
        return {
          status_wording: 'Started',
          status_color: '#2C4E61',
          text_color: '#4DBEFD',
        };
      case 3:
        return {
          status_wording: 'Delivered',
          status_color: '#536134',
          text_color: '#D0FF67',
        };
      case 4:
        return {
          status_wording: 'Cancelled',
          status_color: '#613434',
          text_color: '#FF6666',
        };

      default:
    }
  }

  tableclick(id: any) {
  
    this.router.navigate(['single_order', id]);
  

  
  }
}
function Output(): (target: OrdersComponent, propertyKey: "sendDataToParent") => void {
  throw new Error('Function not implemented.');
}

