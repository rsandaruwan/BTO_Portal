import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecipesInterface } from 'src/app/modals/recipes.model';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  checked: boolean | undefined;
  selectedValue: string | undefined;

  displayedColumns: string[] = [
    'recipes_id',
    'recipes_name',
    'tags',
    'pev_status',
    'action',
  ];
  dataSource: MatTableDataSource<RecipesInterface>;

  constructor() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  ELEMENT_DATA: RecipesInterface[] = [
    {
      recipes_id: 'RID.01535',
      recipes_name: 'Mildly Spiced Curry Chicken',
      tags: 'Spices',
      pev_status: '1',
      action: 'yuiy',
    },
    {
      recipes_id: 'RID.01535',
      recipes_name: 'Mildly Spiced Curry Chicken',
      tags: 'Spices',
      pev_status: '2',
      action: 'yuiy',
    },
    {
      recipes_id: 'RID.01535',
      recipes_name: 'Mildly Spiced Curry Chicken',
      tags: 'Spices',
      pev_status: '3',
      action: 'yuiy',
    },
    {
      recipes_id: 'RID.01535',
      recipes_name: 'Mildly Spiced Curry Chicken',
      tags: 'Spices',
      pev_status: '4',
      action: 'yuiy',
    },
    {
      recipes_id: 'RID.01535',
      recipes_name: 'Mildly Spiced Curry Chicken',
      tags: 'Spices',
      pev_status: '5',
      action: 'yuiy',
    },
    
  ]


}

