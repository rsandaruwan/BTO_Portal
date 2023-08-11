import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttributePopupComponent } from 'src/app/components/popups/attribute-popup/attribute-popup.component';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
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

  displayedColumns: string[] = ['att_id', 'att_name','action'];
  dataSource: MatTableDataSource<AttributeIntarface>;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: AttributeIntarface[] = [
    {
      att_id: 'PID.01535',
      att_name: 'Pure Ceylon Cinnamon Powder',
      action: 'yuiy',
    },
    {
      att_id: 'PID.01535',
      att_name: 'Pure Ceylon Cinnamon Powder',
      action: 'yuiy',
    },
    {
      att_id: 'PID.01535',
      att_name: 'Pure Ceylon Cinnamon Powder',
      action: 'yuiy',
    },
    {
      att_id: 'PID.01535',
      att_name: 'Pure Ceylon Cinnamon Powder',
      action: 'yuiy',
    },
    {
      att_id: 'PID.01535',
      att_name: 'Pure Ceylon Cinnamon Powder',
      action: 'yuiy',
    },
   
  ];

  openAttribute(){
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,
    });
  }
}

