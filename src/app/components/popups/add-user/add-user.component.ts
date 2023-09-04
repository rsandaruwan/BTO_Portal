import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { RoleIntarface } from 'src/app/modals/get_roles.model';
import { DynamicDonePopupComponent } from '../dynamic-done-popup/dynamic-done-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
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
export class AddUserComponent {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('fileUploader')
  fileUploader!: ElementRef;
  checked_delete = false;

  image = '../../../../assets/image/image_background.png';
  imageState = 'showImage';
  base64String: string | undefined;
  imageError: string | undefined;
  selectedRole!: string;
  roles: RoleIntarface[] = [];
  myGroup!: FormGroup;
  user_data_by_id: any;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

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
            }
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  // ImageReset() {
  //   if (this.user.user_details) {
  //     this.image = this.user.user_details.user_image;

  //   }
  // }

  constructor(
    private tokestorage: StorageService,
    private apiService: ApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public user_data: any
  ) {}
  ngOnInit(): void {
    if (this.user_data.id) {
      this.getUserById();
    }
  }

  ngAfterViewInit(): void {
    this.getRoleData();
  }

  first_nameformcontrol = new FormControl('', [Validators.required]);
  secound_nameformcontrol = new FormControl('', [Validators.required]);
  emialformcontrol = new FormControl('', [Validators.required]);
  contactformcontrol = new FormControl('', [Validators.required]);

  getRoleData() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'user-role/all')
      .then((response: any) => {
        this.roles = response.result;
      });
  }

  AddUser() {
    if (this.user_data_by_id) {
      const data = {
        user_id: this.user_data.id,
        first_name: this.first_nameformcontrol.value,
        last_name: this.secound_nameformcontrol.value,
        mobile: this.contactformcontrol.value,
        email: this.emialformcontrol.value,
        user_role: this.selectedRole,
      };

      this.apiService
        .put(data, String(this.tokestorage.getToken()), 'user/edit')
        .then((response: any) => {
          this.closebutton.nativeElement.click();
          this.updated();
        })
        .catch((error: any) => {});
    } else {
      const data = {
        first_name: this.first_nameformcontrol.value,
        last_name: this.secound_nameformcontrol.value,
        mobile: this.contactformcontrol.value,
        email: this.emialformcontrol.value,
        user_role: this.selectedRole,
        password: '123',
        otp_request: 'email',
      };

      this.apiService

        .post(data, String(this.tokestorage.getToken()), 'user/create')

        .then((response: any) => {
          this.getRoleData = response.result[0];

          this.closebutton.nativeElement.click();

          this.done();
        })
        .catch((error: any) => {
          // this.toste.error(error.error.detail.message);
        });
    }
  }

  getUserById() {
    this.apiService
      .get(String(this.tokestorage.getToken()), 'user/' + this.user_data.id)
      .then((response: any) => {
        this.user_data_by_id = response.result;

        this.first_nameformcontrol.setValue(this.user_data_by_id.first_name);
        this.secound_nameformcontrol.setValue(this.user_data_by_id.last_name);
        this.contactformcontrol.setValue(this.user_data_by_id.mobile);
        this.emialformcontrol.setValue(this.user_data_by_id.email);
        this.selectedRole = this.user_data_by_id.user_role.id;
      });
  }

  done() {
    var data1 = {
      msg: 'sUb category added to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }

  updated() {
    var data1 = {
      msg: 'Category updated to the system Successfully!',
    };
    this.dialog.open(DynamicDonePopupComponent, {
      width: '25vw',

      data: data1,
    });
  }
}
