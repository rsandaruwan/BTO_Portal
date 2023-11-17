import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecipeCategoryPopupComponent } from 'src/app/components/popups/recipe-category-popup/recipe-category-popup.component';
import { RecipeCategoryIntarface } from 'src/app/modals/recipe_category.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

interface Page {
  value: number;
}

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.scss'],
})
export class RecipeCategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  selectedPageSize: number = 10;
  selectedValue: string | undefined;
  recipe_category: any;
  recipe_category_name: any = '';
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
    'recipe_category_id',
    'recipe_category_name',
    'action',
  ];
  dataSource: MatTableDataSource<RecipeCategoryIntarface>;

  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getRecipeCategoryData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: RecipeCategoryIntarface[] = [];

  openRecipeCategory() {
    let dialogRef = this.dialog.open(RecipeCategoryPopupComponent, {
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getRecipeCategoryData();
    });
  }

  getRecipeCategoryData() {
    console.log('recipe', this.recipe_category_name);
  
    var parameter = '?';

  
    if (this.selectedPageSize != undefined) {
      parameter += 'limit=' + this.selectedPageSize + '&';
    }
    if (this.skip != undefined) {
      parameter += 'skip=' + this.skip + '&';
    }
    if (this.recipe_category_name != '') {
      parameter += 'recipe_category_name=' + this.recipe_category_name ;
    }

    this.apiService

      .get(String(this.tokestorage.getToken()), 'recipe-category/' + parameter)
      .then((response: any) => {
        this.recipe_category = response.result.data;
        this.count = response.result.page.count;
   
 

        this.dataSource = new MatTableDataSource(this.recipe_category);
        this.paginator.length = this.count;
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      });
  }

  onPageChange(event: PageEvent) {
    this.selectedPageSize = event.pageSize;

    this.skip = event.pageIndex * this.selectedPageSize;
    this.paginator.length = this.count;

    this.getRecipeCategoryData();
  }

  search(event: any) {
    this.recipe_category_name = event.target.value;



    this.getRecipeCategoryData();
  }

  editclick(id: any, name: string) {
    let dialogRef = this.dialog.open(RecipeCategoryPopupComponent, {
      autoFocus: false,

      data: { id: id, name: name },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getRecipeCategoryData();
    });
  }
}
