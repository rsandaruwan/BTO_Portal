import {
  Component,
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { AttributePopupComponent } from '../popups/attribute-popup/attribute-popup.component';
import { DynamicDonePopupComponent } from '../popups/dynamic-done-popup/dynamic-done-popup.component';
import { AttributeIntarface } from 'src/app/modals/attributes.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss'],
})
export class VariantsComponent implements OnInit {
  @Input() changing: Subject<boolean> | undefined;
  @Input() VarientData: any;
  @Output() varient_obj = new EventEmitter<string>();
  varient_error: any = [];
  varient_image_details: any[] = [];
  varient_image: any;
  textareaContent = '';
  autoHeightTextarea!: ElementRef;
  selectedAttribute: any | undefined;
  selectedValuesArray: Array<any> = [];
  selectedValuesNameArray: Array<any> = [];
  attribute_data: AttributeIntarface[] = [];
  attribute_data_list: any[] = [];
  nutrition_error: any = [];
  inputcol_1: any[] = [[]];
  inputcol_2: any[] = [[]];
  checked: boolean | undefined;
  variant_data: any;
  variant_array: any[] = [];
  imageLoop: any;
  imageIndex: any;
  getVarientObj:any

  table_row: Array<any> = [
    {
      nutrition_name: '',
      nutrition_per_100_gram: [''],
      nutrition_in_this_pack: [''],
    },
 
  ];

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {
    this.userForm = this.fb.group({
      name: [],
      rows: this.fb.array([this.fb.control(null)]),
      col2_2s: this.fb.array([this.fb.control(null)]),
      col2_3s: this.fb.array([this.fb.control(null)]),
    });
  }

  varient_formcontrol = new FormControl('', [Validators.required]);
  varientDescription_formcontrol = new FormControl('', [Validators.required]);
  priceformcontrol = new FormControl('', [Validators.required]);
  ngOnInit(): void {
    this.getAttribute();

    console.log(this.changing);

    this.changing?.subscribe((v) => {
      alert(v);

      for (let index = 0; index < this.varient_image_details.length; index++) {
        const element = this.varient_image_details[index];
        this.imageLoop = this.varient_image_details[index];
        this.imageIndex = index;
      }

      this.variant_data = {
        product_variant_name: this.varient_formcontrol.value,
        product_images: [
          {
            product_image: this.imageLoop,
            product_image_order: this.imageIndex,
          },
        ],
        product_price: this.priceformcontrol.value,
        product_attribute_list: this.selectedValuesArray,
        product_variant_nutrition_list: this.table_row,
      };
      this.variant_array.push(this.variant_data);

      console.log(this.variant_array);
      this.varient_obj.emit(this.variant_data);
    });


    console.log('child', this.VarientData);
  

  }

  ngAfterViewInit(): void {

        this.varient_formcontrol.setValue(this.VarientData.product_variant_name)
        this.priceformcontrol.setValue(this.VarientData.product_price)
        this.varient_image_details = this.VarientData.product_images

      
      
        
  
       
     
   
   
  }

  varient_image_data(data: Array<any>) {
    data = data[0];

    for (var i = 0; i < data.length; i++) {
      this.varient_image_details.push(data[i].filename);
    }
  }
  adjustTextareaHeight(event: Event): void {
    const textarea: HTMLTextAreaElement = this.autoHeightTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  onSelectionChange(): void {
    if (
      !this.selectedValuesArray.find(
        (element) => element.id === this.selectedAttribute.attribute_id
      )
    ) {
      var data = {
        attribute_id: this.selectedAttribute.attribute_id,
        attribute_value: '',
      };
      this.selectedValuesArray.push(data);
      this.selectedValuesNameArray.push(this.selectedAttribute);
    }
  }
  AddAttribute() {
    let dialogRef = this.dialog.open(AttributePopupComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        // You can check the result if needed.
        this.done();
        this.getAttribute();
      }
    });
  }
  done() {
    var data1 = {
      msg: 'Category added to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }

  public getAttribute() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'attributes/all')
      .then((response: any) => {
        this.attribute_data = response.result;
      });
  }
  dataadd(row: number, i: number, col: number, event: any) {
    var data = event.target.value;

    if (i == 2) {
      this.table_row[row].nutrition_per_100_gram[col] = data;
    } else {
      this.table_row[row].nutrition_in_this_pack[col] = data;
    }
  }
  removeinput2_2(index: number, id: any) {
    if (this.table_row[index].nutrition_per_100_gram.length > 1) {
      this.table_row[index].nutrition_per_100_gram.splice(id, 1);
    }
  }
  addcell2_2(i: number): void {
    this.table_row[i].nutrition_per_100_gram.push('');
    (this.userForm.get('col2_2s') as FormArray).push(this.fb.control(null));
    this.inputcol_1.push('');
  }
  removeinput2_3(index: number, id: any) {
    if (this.table_row[index].nutrition_in_this_pack.length > 1) {
      this.table_row[index].nutrition_in_this_pack.splice(id, 1);
    }
  }
  addcell2_3(i: number): void {
    this.table_row[i].nutrition_in_this_pack.push('');
    (this.userForm.get('col2_3s') as FormArray).push(this.fb.control(null));
    this.inputcol_2.push('');
  }
  deleteRow(index: number) {
    if (this.table_row.length > 1) {
      this.table_row.splice(index, 1);
    }
  }
  addrow(): void {
    this.table_row.push({
      nutrition_name: '',
      nutrition_per_100_gram: [''],
      nutrition_in_this_pack: [''],
    });
    (this.userForm.get('rows') as FormArray).push(this.fb.control(null));
  }

}
