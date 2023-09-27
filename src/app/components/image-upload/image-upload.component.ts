import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, AfterViewInit {
  @Input() id: string | undefined;
  @Input() multiple!: string;
  @Output() fileout = new EventEmitter<any>();
  @Input() value: string | undefined;
  @Input() shareParent: any[] = [];

  uploadId: any;
  imageType: any;

  url: string | null = null; // Initialize url as null
  urls: Array<string> = [];
  image_arr: [] = [];
  images: any;
  fileName: any;
  fileUrl: any;
  mul_image_path: any;
  mul_image_name: any;
  mul_image_obj: any;
  muti_img_arr: Array<any> = [];
  targetData: any;

  ngOnInit(): void {}

  constructor(
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {}
  ngAfterViewInit(): void {
    this.getMultipleImages();
  }

  getMultipleImages() {
    setTimeout(() => {
      for (let index = 0; index < this.shareParent.length; index++) {
        this.urls.push(this.shareParent[index].image_path);

        this.targetData = this.shareParent.find(
          (item) => item.image_path === this.urls[index]
        );
        if (this.targetData) {
          this.mul_image_path = this.targetData.image_path;
          this.mul_image_name = this.targetData.image_name;

          this.mul_image_obj = {
            filename: this.mul_image_name,
            temp_url: this.mul_image_path,
          };

          this.muti_img_arr.push(this.mul_image_obj);
        } else {
        }
      }
    }, 3000);
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target?.result as string; // Use optional chaining
      };
    }
    this.uploadId = this.id;
    this.imageType = this.multiple;

    const formData = new FormData();

    formData.append('files', event.target.files[0]);

    this.apiService
      .post_file(
        formData,
        String(this.tokestorage.getToken()),
        'general/upload'
      )
      .then((response: any) => {
        this.fileName = response.result[0].filename;
        this.fileUrl = response.result[0].temp_url;

        this.addNewItem();
      })
      .catch((error: any) => {});
  }

  onSelectFiles(event: any) {
    var arr: Array<any> = event.target.files.toA;

    if (event.target.files && event.target.files[0]) {
      for (const singlefile of event.target.files) {
        const element = singlefile;
        const reader = new FileReader();

        reader.readAsDataURL(element);

        reader.onload = (event) => {
          this.urls.push(event.target?.result as string); // Use optional chaining
        };
      }
    }

    this.uploadId = this.id;
    this.imageType = this.multiple;
    const formData = new FormData();

    for (let index = 0; index < event.target.files.length; index++) {
      const element = event.target.files[index];

      formData.append('files', element);
    }
    this.apiService
      .post_file(
        formData,
        String(this.tokestorage.getToken()),
        'general/upload'
      )
      .then((response: any) => {
        this.muti_img_arr.push(response.result);

       

        // if (this.shareParent.length) {
        //   this.getMultipleImages();
        // }

        this.addNewItems(this.muti_img_arr);
      })
      .catch((error: any) => {});

    // if (index == event.target.files.length) {

    //   this.addNewItems(muti_img_arr);
    // }
  }

  addNewItem() {
    var value = {
      fileName: this.fileName,
      fileUrl: this.fileUrl,
    };
    this.fileout.emit(value);
  }

  addNewItems(arr: Array<any>) {
    this.fileout.emit(arr);
  }

  public delete() {
    if (this.url) {
      this.url = '';
    }
  }
  public delete1(id: any) {
    if (this.urls) {
      this.urls.splice(id, 1);
    }
  }
}
