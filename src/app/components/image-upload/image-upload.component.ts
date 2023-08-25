import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @Input() id: string | undefined;
  @Input()
  multiple!: string;
  @Output() newItemEvent = new EventEmitter<string>();

  uploadId: any;
  imageType: any;

  url: string | null = null; // Initialize url as null
  urls: Array<string> = [];

  ngOnInit(): void {
    // this.uploadId = this.id
    // this.imageType = this.multiple
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
  }

  onSelectFiles(event: any) {
    var arr: Array<any> = event.target.files.toA;

    if (event.target.files && event.target.files[0]) {
      for (const singlefile of event.target.files) {
        const element = singlefile;
        const reader = new FileReader();

        reader.readAsDataURL(element);
        console.log(this.urls);

        reader.onload = (event) => {
          this.urls.push(event.target?.result as string); // Use optional chaining
        };
      }
    }

    this.uploadId = this.id;
    this.imageType = this.multiple;
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  public delete() {
    if (this.url) {
      this.url = '';
    }
  }
  public delete1(id:any) {
    if (this.urls) {
      this.urls.reverse().splice(id, 1);
    }
  }
}
