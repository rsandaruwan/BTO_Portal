import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormControl, Validators } from '@angular/forms';
import { DynamicDonePopupComponent } from 'src/app/components/popups/dynamic-done-popup/dynamic-done-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
export class ProfileComponent {

  @ViewChild('fileUploader')
  fileUploader!: ElementRef;
  imageState = 'showImage';
  imageError: string | undefined;
  base64String: string | undefined;
  checked_delete = false;
  hide = true;
  image = '../../../assets/image/image_background.png';
  active_color:any = "#97BE41"
  userId: any ;
  user_data_by_id:any;
  resultArray: { type: string; msg: string }[] = []; 



  constructor(
    public dialog: MatDialog,
    private tokestorage: StorageService,
    private apiService: ApiService,
    
   
  ) {}
  ngOnInit(): void {

    console.log(this.tokestorage.getUser().id);
    this.userId = this.tokestorage.getUser().id
    
    this.getUserById();
  }

  first_nameformcontrol = new FormControl('', [Validators.required]);
  last_nameformcontrol = new FormControl('', [Validators.required]);
  user_contactformcontrol = new FormControl('', [Validators.required]);
  user_emailformcontrol = new FormControl('', [Validators.required]);

  current_passwordformcontrol = new FormControl('', [Validators.required]);
  new_passwordformcontrol = new FormControl('', [Validators.required]);
  confirm_passwordformcontrol = new FormControl('', [Validators.required]);


  
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
  ImageReset() {
    // if (this.user.user_details) {
    //   this.image = this.user.user_details.user_image;
    
    }

    resetData(){
      
      this.first_nameformcontrol .setValue(this.user_data_by_id.first_name);
      this.last_nameformcontrol .setValue(this.user_data_by_id.last_name);
      this.user_contactformcontrol.setValue(this.user_data_by_id.mobile);
      this.user_emailformcontrol .setValue(this.user_data_by_id.email);
    }

    getUserById() {
      this.apiService
        .get(String(this.tokestorage.getToken()), 'user/' + this.userId)
        .then((response: any) => {
          this.user_data_by_id = response.result;
      

          this.first_nameformcontrol .setValue(this.user_data_by_id.first_name);
          this.last_nameformcontrol .setValue(this.user_data_by_id.last_name);
          this.user_contactformcontrol.setValue(this.user_data_by_id.mobile);
          this.user_emailformcontrol .setValue(this.user_data_by_id.email);

        });
    }

    editUser(){
      var update_data = {
        user_id:this.userId,
        first_name:this.first_nameformcontrol.value, 
        last_name:this.last_nameformcontrol.value,
        mobile:this.user_contactformcontrol.value, 
        email: this.user_emailformcontrol.value,
        user_role:"63e4824cb3e51d4cc0860af1"
      };

      this.apiService
        .put(
          update_data,
          String(this.tokestorage.getToken()),
          'user/edit'
        )
        .then((response: any) => {
          // this.closebutton.nativeElement.click();
          this.updated();
        })
        .catch((error: any) => {
          error.error.detail.forEach((item: any) => {
            if (item.loc && item.loc[1] && item.msg) {
              this.resultArray.push({
                type: item.loc[1],
                msg: item.msg,

                
              });
              

            }
          });

          console.log(this.resultArray);
        });
    }
    updated() {
      var data1 = {
        msg: 'Profile updated to the system Successfully!',
      };
      this.dialog.open(DynamicDonePopupComponent, {
        width: '25vw',
  
        data: data1,
      });
    }
  }


