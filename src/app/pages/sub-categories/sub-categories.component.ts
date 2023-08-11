import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubCategoryPopupComponent } from 'src/app/components/popups/sub-category-popup/sub-category-popup.component';
import { SubCategoryIntarface } from 'src/app/modals/sub_category.model';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements AfterViewInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  selectedValue: string | undefined;

  displayedColumns: string[] = ['sub_id', 'sub_name','action'];
  dataSource: MatTableDataSource<SubCategoryIntarface>;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: SubCategoryIntarface[] = [
    {
      sub_id: 'PID.01535',
      sub_name: 'Pure Ceylon Cinnamon Powder',
      action: 'yuiy',
    },
    {
      sub_id: 'PID.01535',
      sub_name: 'Pure Ceylon Cinnamon Powder',
      action: 'yuiy',
    },
    {
      sub_id: 'PID.01535',
      sub_name: 'Pure Ceylon Cinnamon Powder',
      action: 'yuiy',
    },
 
  ];

  openCategory(){
    let dialogRef = this.dialog.open(SubCategoryPopupComponent, {
      autoFocus: false,
    });
  }
}

