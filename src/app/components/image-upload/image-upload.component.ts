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
  multiple_image_parent:any[] = []

  url: string | null = null; // Initialize url as null
  urls: Array<string> = [];

  fileName: any;
  fileUrl: any;

  ngOnInit(): void {

    setTimeout(()=>{                       
      // console.log("image", this.shareParent);
      


  }, 1000);
    
    

  }

  constructor(
    private tokestorage: StorageService,
    private apiService: ApiService
  ) {}
  ngAfterViewInit(): void {

   
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
    var muti_img_arr: Array<any> = [];
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
          muti_img_arr.push(response.result);
          this.addNewItems(muti_img_arr);
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
