import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsInterface } from 'src/app/modals/product.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  product_data: any;
  varient_data : any[ ] = []
  category_data : any[ ] = []
  selectedValue: string | undefined;

  displayedColumns: string[] = [
    'product_id',
    'vaproduct_variant_name',
    'product_name',
    'category',
    'product_rating',
    'product_in_stock',
    'action',
  ];
  dataSource: MatTableDataSource<ProductsInterface>;

  constructor(
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getProductData();
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

  ELEMENT_DATA: ProductsInterface[] = [];

  getProductData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'products/view')
      .then((response: any) => {
        this.product_data = response.result;
        this.dataSource = this.dataSource = new MatTableDataSource(
          this.product_data
        );

        this.varient_data = this.product_data.product_variants
        this.category_data =  this.product_data


        console.log('====================================');
        // console.log(this.product_data);
        console.log(this.category_data);
        console.log('====================================');
      });
  }
}
