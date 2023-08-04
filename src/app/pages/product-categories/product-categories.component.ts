import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsInterface } from 'src/app/modals/product.model';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  selectedValue: string | undefined;

  displayedColumns: string[] = [
    'p_id',
    'p_name',
    'category',
    'sub_category',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<ProductsInterface>;

  constructor() {
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

  ELEMENT_DATA: ProductsInterface[] = [
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Out of stock',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Out of stock',
      action: 'yuiy',
    },   {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Out of stock',
      action: 'yuiy',
    },   {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Out of stock',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },
    {
      p_id: 'PID.01535',
      p_name: 'Pure Ceylon Cinnamon Powder',
      category: 'Spices',
      sub_category: 'Spices',
      status: 'Avilable',
      action: 'yuiy',
    },
  ]

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
