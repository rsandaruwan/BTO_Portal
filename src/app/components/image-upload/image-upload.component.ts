import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  
  url: string | null = null; // Initialize url as null

  onSelectFile(event: any) {
    
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]);
  
      reader.onload = (event) => {
        this.url = event.target?.result as string; // Use optional chaining
      };
    }
    console.log('====================================');
    console.log(event.target.files);
    console.log('====================================');
  }
  
  public delete() {
    this.url = '';
  
  }
}
