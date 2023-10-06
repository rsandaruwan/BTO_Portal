import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';

import { ProductsInterface } from 'src/app/modals/product.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { AddProductsComponent } from '../add-products/add-products.component';
import { CategoryInterface } from 'src/app/modals/category.model';
import { SubCategoryIntarface } from 'src/app/modals/sub_category.model';

interface Page {
  value: number;
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
  selectedcategory: '' = '';
  selectedSubCategory: '' = '';
  product_id: any;
  categoryName: any;
  categoryid: any;

  getCategory: any;
  getsubCategory: any;
  categories: CategoryInterface[] = [];
  Subcategories: SubCategoryIntarface[] = [];

  searchProName: any = '';
  searchsubcat: any = '';

  selectedPageSize: number = 10;
  search_cat: any = '';
  skip: any = 0;
  count: number = 0;

  pages: Page[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
  ];

  displayedColumns: string[] = [
    'vaproduct_variant_name',
    'product_name',
    'category',
    // 'product_rating',
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

    if (this.selectedPageSize != undefined) {
      parameter += 'limit=' + this.selectedPageSize + '&';
    }
    if (this.skip != undefined) {
      parameter += 'skip=' + this.skip + '&';
    }

    if (this.search_cat != undefined) {
      parameter += 'category_id=' + this.selectedcategory + '&';
    }
    if (this.searchsubcat != undefined) {
      parameter += 'sub_category_id=' + this.selectedSubCategory + '&';
    }
    if (this.searchProName != undefined) {
      parameter += 'product_name=' + this.searchProName + '&';
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'products' + parameter)
      .then((response: any) => {
        this.product_data = response.result.data;
        this.dataSource = new MatTableDataSource(this.product_data );
        this.count = response.result.page.count;

        this.paginator.length = this.count;
        console.log("prduct",this.product_data);
        
        // this.varient_data = this.product_data.product_variants;
        // this.category_data = this.product_data;
        

        
      });
  }

  editlist() {
    this.getProductData();
  }

  search(event: any) {
    this.searchProName = event.target.value;

    this.getProductData();
  }
  editclick(id: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id,
      },
    };
    this.router.navigate(['portal/product/add_product'], navigationExtras);
  }

  getCategoryData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'category/view')
      .then((response: any) => {
        this.categories = response.result;

        this.getProductData();
      });
  }
  getSubCategoryData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'sub-category/view')
      .then((response: any) => {
        this.Subcategories = response.result;
        this.getProductData();
      });
  }

  onPageChange(event: PageEvent) {
    this.selectedPageSize = event.pageSize;

    this.skip = (event.pageIndex* this.selectedPageSize);
    this.paginator.length = this.count;

    this.getProductData();
  }

}
