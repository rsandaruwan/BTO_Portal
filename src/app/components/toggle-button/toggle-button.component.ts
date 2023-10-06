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
  @Input() value: number | undefined;
  @Input() type: number | undefined;
  @Output() changed = new EventEmitter<boolean>();
  @ViewChild('lable') lable: ElementRef | undefined;
  private on1: boolean | undefined;

  constructor() {}

  ngOnInit() {
    this.on = false
  }
  ngAfterViewInit(): void {
   

    if (this.value == 3) {

      this.on = true
    } else {
    if (this.value == 2) {
      this.on = false

    } else {
      
    }
  }
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
    this.changed.emit(data.checked);
  }
}
