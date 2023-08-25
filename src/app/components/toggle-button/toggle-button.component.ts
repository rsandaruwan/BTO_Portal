import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
})
export class ToggleButtonComponent {
  @Input() on: boolean | undefined;
  @Input() id: any;
  @Input() showLabels = true;
  @Input() leftText = 'Yes';
  @Input() width = 140;
  @Input() rightText = 'No';
  @Input() type :number | undefined;
  @Output() changed = new EventEmitter<boolean>();
  @ViewChild('lable') lable: ElementRef | undefined;
  private on1: boolean | undefined;



  constructor() {


  }

  ngOnInit(){
   
  }

  Valchange(data: any) {
    if (this.on) {
      this.lable?.nativeElement.setAttribute(
        'style',
        'left:' + 4 + 'px !important'
      );
    } else {
      this.lable?.nativeElement.setAttribute(
        'style',
        'left:' + (this.width - 26) + 'px !important'
      );
    }
    
    this.on = data.checked;
    this.changed.next(data.checked);
    
  }
}
