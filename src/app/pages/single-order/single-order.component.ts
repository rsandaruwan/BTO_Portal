import { Component, AfterViewInit, ViewChild,  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProductItemIntarface } from 'src/app/modals/product-item.model';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss'],
})
export class SingleOrderComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  Order_id: any;

  displayedColumns: string[] = ['product_name', 'item_price', 'quantity', 'amount'];
  dataSource: MatTableDataSource<ProductItemIntarface>;

  constructor(private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.Order_id = this.route.snapshot.paramMap.get('order_id');
    console.log(this.Order_id);
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: ProductItemIntarface[] = [
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },
    {
      product_name: 'PID.01535',
      item_price: '$220.21',
      quantity:
        '25',
        amount: '660.63',
    },

    
  ];
}


