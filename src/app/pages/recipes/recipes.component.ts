import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { DynamicConfirmationPopupComponent } from 'src/app/components/popups/dynamic-confirmation-popup/dynamic-confirmation-popup.component';
import { RecipesInterface } from 'src/app/modals/recipes.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

interface Page {
  value: number;
}

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  recipe_data: any;
  category_data: any;
  search_recipe: any = '';
  skip: any = 0;
  count: number = 0;
  selectedPageSize: number = 10;
  pro_status: any;
  user_status_id:any

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  checked: boolean | undefined;
  selectedValue: string | undefined;
  product_status: any;

  displayedColumns: string[] = [
    'recipe_id',
    'recipe_name',
    'recipe_category_name',
    'recipe_featured',
    'action',
  ];
  dataSource: MatTableDataSource<RecipesInterface>;

  pages: Page[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
  ];

  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getRecipe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ELEMENT_DATA: RecipesInterface[] = [];

  getCategories() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'category/view/')
      .then((response: any) => {
        this.category_data = response.result;

   
      });
  }

  getRecipe() {
    var parameter = '?';

    if (this.search_recipe != undefined) {
      parameter += 'attribute_name=' + this.search_recipe + '&';
    }
    if (this.selectedPageSize != undefined) {
      parameter += 'limit=' + this.selectedPageSize + '&';
    }
    if (this.skip != undefined) {
      parameter += 'skip=' + this.skip;
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'recipe' + parameter)
      .then((response: any) => {
        this.recipe_data = response.result.data;
        this.product_status = this.recipe_data.recipe_featured;

        console.log(this.recipe_data);

        this.count = response.result.page.count;

        this.dataSource = new MatTableDataSource(this.recipe_data);
        this.paginator.length = this.count;
        this.chageStatus(1);
      });
  }
  search(event: any) {
    this.search_recipe = event.target.value;

    this.getRecipe();
  }

  


  chageStatus( id :any ) {
    if (id == 1) {
      this.product_status = 2;
    } else {
      this.product_status = 3;
    }
  }
  

  editclick(id: any){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id,
      },
    };
    this.router.navigate(['portal/recipes/add_recipes'], navigationExtras);
  }

  
}
