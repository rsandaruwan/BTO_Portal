import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
  animations: [
    trigger('selectedImage', [
      state(
        'hideImage',
        style({
          opacity: 0,
        })
      ),
      state(
        'showImage',
        style({
          opacity: 1,
        })
      ),
      transition('showImage=>hideImage', [animate(0)]),
      transition('hideImage=>showImage', [animate(650)]),
    ]),
  ],
})
export class AddProductsComponent {
  @ViewChild('autoHeightTextarea')
  autoHeightTextarea!: ElementRef;

  imageState = 'showImage';
  selectedValue: string | undefined;
  imageError: string | undefined;
  image = '../../../assets/icons/imageAdd.png';
  textareaContent = '';
  checked: boolean | undefined;
  checked1: boolean | undefined;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  base64String: any;
  fontSize: any;

  fileChangeEvent(fileInput: any): any {
    this.imageError;

    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 1000000;
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000000 + 'Mb';
        // this.toste.error(this.imageError, 'Error');
        alert(this.imageError + 'Error');
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs: any): any => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimensions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            // this.toste.error(this.imageError, 'Error');
            alert(this.imageError + 'Error');
            return false;
          } else {
            const imgBase64Path = e.target.result;
            const encoder = new TextEncoder();
            const bytes = encoder.encode(imgBase64Path).length;
            const sizeInMB = bytes / (1024 * 1024);

            if (sizeInMB < 0.9) {
              this.base64String = imgBase64Path;
              this.image = e.target.result;
            } else {
              // fileInput.target.files[0]=undefined;
              this.imageError = 'Please reduce image quality ';
              // this.toste.error(this.imageError, 'Error');
              alert(this.imageError + 'Error');
            }
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  adjustTextareaHeight(event: Event): void {
    const textarea: HTMLTextAreaElement = this.autoHeightTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  test(data: any) {
    alert(data);
  }

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [],
      rows: this.fb.array([
        this.fb.control(null)
      ]),
      col2_2s: this.fb.array([
        this.fb.control(null)
      ]),
      col2_3s: this.fb.array([
        this.fb.control(null)
      ])
    })
  }

  addrow(): void {
    (this.userForm.get('rows') as FormArray).push(
      this.fb.control(null)
    );
  }
  getrowFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('rows')).controls
  }
  addcell2_2(): void {
    (this.userForm.get('col2_2s') as FormArray).push(
      this.fb.control(null)
    );
  }
  getcell2_2FormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('col2_2s')).controls
  }
  addcell2_3(): void {
    (this.userForm.get('col2_3s') as FormArray).push(
      this.fb.control(null)
    );
  }
  getcell2_3FormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('col2_3s')).controls
  }
}
