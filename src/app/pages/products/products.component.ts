import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';

import { ProductsInterface } from 'src/app/modals/product.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { AddProductsComponent } from '../add-products/add-products.component';
import { CategoryInterface } from 'src/app/modals/category.model';
import { SubCategoryIntarface } from 'src/app/modals/sub_category.model';

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
  varient_data: any[] = [];
  category_data: any[] = [];
  selectedValue: string | undefined;
  product_id: any;
  categoryName:any;
  categoryid:any;

  getCategory:any
  getsubCategory:any
  categories: CategoryInterface[] = [];
  Subcategories: SubCategoryIntarface[] = [];
  search_cat: any = '';
  searchProName: any = '';
  searchsubcat: any = '';



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
    private apiService: ApiService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getProductData();
    this.getCategoryData();
    this.getSubCategoryData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  ELEMENT_DATA: ProductsInterface[] = [];

  getProductData() {

    var parameter = '?';

    if (this.search_cat != undefined) {
      parameter += 'category_id=' + this.search_cat + '&';
    }
    if (this.searchsubcat != undefined) {
      parameter += 'sub_category_id=' + this.searchsubcat + '&';
    }
    if (this.searchProName != undefined) {
      parameter += 'product_name=' + this.searchProName;
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'products/search'+ parameter)
      .then((response: any) => {
        this.product_data = response.result;
        this.dataSource = this.dataSource = new MatTableDataSource(
          this.product_data
        );

        this.varient_data = this.product_data.product_variants;
        this.category_data = this.product_data;
      

        for (let index = 0; index < this.product_data.length; index++) {
      this.categoryid  = this.product_data[index].category_details[0].category_id
      // this.getCategoryData(this.categoryid) 
        }
      });
  }

  search(event: any) {
    this.searchProName = event.target.value;
console.log( this.searchProName);

    this.getProductData();
  }
  editclick(id: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id,
      },
    };
    this.router.navigate(['portal/add_product'], navigationExtras);
  }


  // getCategoryData(id:any) {
  //   this.apiService
  //     .get(String(this.tokestorage.getToken()), 'category/' +id)
  //     .then((response: any) => {
  //      console.log(response);
       
  //     });
  // }
  getCategoryData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'category/view')
      .then((response: any) => {
        this.categories = response.result;
      });
  }
  getSubCategoryData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'sub-category/view')
      .then((response: any) => {
        this.Subcategories = response.result;
      });
  }

}
