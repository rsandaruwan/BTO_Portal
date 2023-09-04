import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
;

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent  implements AfterViewInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  selectedValue: string | undefined;
  attribute_data:any
  search_att: any = '';


  displayedColumns: string[] = ['attribute_id', 'attribute_name','action'];
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

  ELEMENT_DATA: AttributeIntarface[] = [
   
  ];

  openAttribute(){
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,
    });
  }

  getAttributeData() {
    var name = '';

    if (this.search_att != undefined) {
      name = '?attribute_name=' + this.search_att;

  
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'attributes/'+name)
      .then((response: any) => {
        this.attribute_data = response.result.data;
        this.dataSource = this.dataSource = new MatTableDataSource(
          this.attribute_data
        );

      });
  }

  search(event: any) {
    this.search_att = event.target.value;

    this.getAttributeData();
  }

  
  editclick(id: any, name: string) {
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,

      data: {id :id , name:name}
    });
  }
}

