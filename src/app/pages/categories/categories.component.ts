import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryInterface } from 'src/app/modals/category.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryPopupComponent } from 'src/app/components/popups/category-popup/category-popup.component';

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

  selectedValue: string | undefined;

  displayedColumns: string[] = ['c_id', 'c_name', 'sub_category', 'action'];
  dataSource: MatTableDataSource<CategoryInterface>;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: CategoryInterface[] = [
    {
      c_id: 'PID.01535',
      c_name: 'Pure Ceylon Cinnamon Powder',
      sub_category: [
        { sub_id: 'ds', sub_name: 'sdsd', action: 'ds' },
        { sub_id: 'ds', sub_name: 'sdsd', action: 'ds' },
      ],
      action: 'yuiy',
    },
    {
      c_id: 'PID.01535',
      c_name: 'Pure Ceylon Cinnamon Powder',
      sub_category: [
        { sub_id: 'ds', sub_name: 'sdsd', action: 'ds' },
        { sub_id: 'ds', sub_name: 'sdsd', action: 'ds' },
      ],
      action: 'yuiy',
    },
  ];

  openCategory() {
    let dialogRef = this.dialog.open(CategoryPopupComponent, {
      autoFocus: false,
    });
  }
}
