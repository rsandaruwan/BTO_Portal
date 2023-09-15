import { Component, AfterViewInit, ViewChild,  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProductItemIntarface } from 'src/app/modals/product-item.model';

interface Order_status_image{
image:string;
name:string
}
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

oredr_status_array :Array<Order_status_image>=[{image:'orderplaced_white',name:'Order Placed'}, {image:'packed_white',name:'Packed'}, {image:'shipping_white',name:'Shipping'},{image:'delivered_white',name:'Delivered'} ]


  displayedColumns: string[] = ['product_name', 'item_price', 'quantity', 'amount'];
  dataSource: MatTableDataSource<ProductItemIntarface>;

  order_status: any[] = [1, 2, 3, 4]

  constructor(private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.Order_id = this.route.snapshot.paramMap.get('order_id');
    this.checkOrder()
    
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


    
  ];

checkOrder(){
var order_status=3;

  for (let index = 0; index < order_status; index++) {
   this.oredr_status_array[index].image = this.oredr_status_array[index].image.split('_')[0]+'_green'
    
  }

}
  

}


