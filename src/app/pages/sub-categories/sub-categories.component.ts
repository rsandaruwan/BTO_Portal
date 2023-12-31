import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryPopupComponent } from 'src/app/components/popups/category-popup/category-popup.component';
import { SubCategoryPopupComponent } from 'src/app/components/popups/sub-category-popup/sub-category-popup.component';
import { SubCategoryIntarface } from 'src/app/modals/sub_category.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  search_sub_cat: any = '';
  selectedPageSize: number = 10;
  sub_category_data: any;

  skip: any = 0;
  count: number = 0;

  selectedValue: string | undefined;

  displayedColumns: string[] = [
    'sub_category_id',
    'sub_category_name',
    'sub_category_has_category_details',
    'action',
  ];
  dataSource: MatTableDataSource<SubCategoryIntarface>;

  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this.getSubCategoryData();
  }

  ELEMENT_DATA: SubCategoryIntarface[] = [];

  openCategory() {
    let dialogRef = this.dialog.open(SubCategoryPopupComponent, {
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getSubCategoryData();
    });
  }

  getSubCategoryData() {
    var parameter = '?';

    if (this.search_sub_cat != undefined) {
      parameter += 'attribute_name=' + this.search_sub_cat + '&';
    }
    if (this.selectedPageSize != undefined) {
      parameter += 'limit=' + this.selectedPageSize + '&';
    }
    if (this.skip != undefined) {
      parameter += 'skip=' + this.skip;
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'sub-category' + parameter)
      .then((response: any) => {
        this.sub_category_data = response.result.data;
        this.count = response.result.page[0].count;
        this.dataSource = this.dataSource = new MatTableDataSource(
          this.sub_category_data
        );
        console.log(this.sub_category_data);
      });
  }

  onPageChange(event: PageEvent) {
    this.selectedPageSize = event.pageSize;

    this.skip = event.pageIndex * this.selectedPageSize;
    this.paginator.length = this.count;

    this.getSubCategoryData();
  }

  search(event: any) {
    this.search_sub_cat = event.target.value;

    this.getSubCategoryData();
  }

  editclick(id: any) {
    let dialogRef = this.dialog.open(SubCategoryPopupComponent, {
      autoFocus: false,

      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getSubCategoryData();
    });
  }
}
