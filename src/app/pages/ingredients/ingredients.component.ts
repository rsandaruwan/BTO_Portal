import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IngredientPopupComponent } from 'src/app/components/popups/ingredient-popup/ingredient-popup.component';
import { IngredientIntarface } from 'src/app/modals/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  selectedValue: string | undefined;

  displayedColumns: string[] = ['ing_id', 'ing_name', 'description', 'action'];
  dataSource: MatTableDataSource<IngredientIntarface>;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: IngredientIntarface[] = [
    {
      ing_id: 'PID.01535',
      ing_name: 'Pepper',
      description:
        'If one flavor combination could represent The Spice House, it is this hard-working butcher s rub. Back of the Yards, our most popular blend, is ideal for grilling, great in burgers, and perfect with fish or eggs.',
      action: 'yuiy',
    },

    {
      ing_id: 'PID.01535',
      ing_name: 'Pepper',
      description:
        'If one flavor combination could represent The Spice House, it is this hard-working butcher s rub. Back of the Yards, our most popular blend, is ideal for grilling, great in burgers, and perfect with fish or eggs.',
      action: 'yuiy',
    },

    {
      ing_id: 'PID.01535',
      ing_name: 'Pepper',
      description:
        'If one flavor combination could represent The Spice House, it is this hard-working butcher s rub. Back of the Yards, our most popular blend, is ideal for grilling, great in burgers, and perfect with fish or eggs.',
      action: 'yuiy',
    },
  ];

  openAttribute() {
    let dialogRef = this.dialog.open(IngredientPopupComponent, {
      autoFocus: false,
    });
  }
}
