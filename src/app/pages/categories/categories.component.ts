import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryInterface } from 'src/app/modals/category.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryPopupComponent } from 'src/app/components/popups/category-popup/category-popup.component';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  selectedPageSize: number = 10;
  search_cat: any = '';
  skip: any = 0;
  count: number = 0;

  selectedValue: string | undefined;
  category_data: any;
  displayedColumns: string[] = ['category_id', 'category_name', 'action'];
  dataSource: MatTableDataSource<CategoryInterface>;

  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getCategoryData();

  }

  ngAfterViewInit(): void {
  
  }

  openCategory() {
    let dialogRef = this.dialog.open(CategoryPopupComponent, {
      autoFocus: false,
    });
  }

  getCategoryData() {
   
    var parameter = '?';

    if (this.search_cat != undefined) {
      parameter += 'category_name=' + this.search_cat + '&';
    }
    if (this.selectedPageSize != undefined) {
      parameter += 'limit=' + this.selectedPageSize + '&';
    }
    if (this.skip != undefined) {
      parameter += 'skip=' + this.skip;
    }


    this.apiService
      .get(String(this.tokestorage.getToken()), 'category' + parameter)
      .then((response: any) => {
        this.category_data = response.result.data;
        this.count = response.result.page[0].count;
        this.dataSource = this.dataSource = new MatTableDataSource(
          this.category_data
        );
      
      });
  }

  onPageChange(event: PageEvent) {
    this.selectedPageSize = event.pageSize;
    console.log(event);
    this.skip = (event.pageIndex* this.selectedPageSize);
    this.paginator.length = this.count;

    this.getCategoryData();
  }

  search(event: any) {
    this.search_cat = event.target.value;

    this.getCategoryData();
  }

  editclick(id: any, name: string) {
    let dialogRef = this.dialog.open(CategoryPopupComponent, {
      autoFocus: false,

      data: {id :id, categoryName: name }
    });
  }
}
