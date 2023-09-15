import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

interface Page {
  value: number;
}
@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss'],
})
export class AttributesComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  selectedPageSize: number = 10;
  selectedValue: string | undefined;
  attribute_data: any;
  search_att: any = '';
  skip: any = 0;
  count: number = 0;

  pages: Page[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
  ];

  displayedColumns: string[] = ['attribute_id', 'attribute_name', 'action'];
  dataSource: MatTableDataSource<AttributeIntarface>;

  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getAttributeData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: AttributeIntarface[] = [];

  openAttribute() {
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,
    });
  }

  getAttributeData() {
    var parameter = '?';

    if (this.search_att != undefined) {
      parameter += 'attribute_name=' + this.search_att + '&';
    }
    if (this.selectedPageSize != undefined) {
      parameter += 'limit=' + this.selectedPageSize + '&';
    }
    if (this.skip != undefined) {
      parameter += 'skip=' + this.skip;
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'attributes/' + parameter)
      .then((response: any) => {
        this.attribute_data = response.result.data;
        this.count = response.result.page[0].count;

        this.dataSource = new MatTableDataSource(this.attribute_data);
        this.paginator.length = this.count;
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
       
      });
  }

  onPageChange(event: PageEvent) {
    this.selectedPageSize = event.pageSize;

    this.skip = (event.pageIndex* this.selectedPageSize);
    this.paginator.length = this.count;

    this.getAttributeData();
  }

  search(event: any) {
    this.search_att = event.target.value;

    this.getAttributeData();
  }

  editclick(id: any, name: string) {}
}
