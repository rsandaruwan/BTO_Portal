import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IngredientPopupComponent } from 'src/app/components/popups/ingredient-popup/ingredient-popup.component';
import { IngredientIntarface } from 'src/app/modals/ingredient.model';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

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
  ingredient_data: any;
  search_ing: any;

  displayedColumns: string[] = [
    'ingredient_id',
    'ingredient_name',
    'ingredient_description',
    'action',
  ];
  dataSource: MatTableDataSource<IngredientIntarface>;

  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getIngredientData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ELEMENT_DATA: IngredientIntarface[] = [];

  openAttribute() {
    let dialogRef = this.dialog.open(IngredientPopupComponent, {
      autoFocus: false,
    });
  }

  getIngredientData() {
    var name = '';

    if (this.search_ing != undefined) {
      name = '?category_name=' + this.search_ing;
    }

    this.apiService
      .get(String(this.tokestorage.getToken()), 'ingredient/view')
      .then((response: any) => {
        this.ingredient_data = response.result;
        this.dataSource = this.dataSource = new MatTableDataSource(
          this.ingredient_data
        );
      });
  }

  search(event: any) {
    this.search_ing = event.target.value;

    this.getIngredientData();
  }
}
