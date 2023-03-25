import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'component-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeComponent {

  public rangeCtrl = new FormControl();

  @Input() id!: string;
  @Input() label = '';
  @Input() minRange = 0;
  @Input() maxRange = 100;
  @Input() stepRange = 2;
  @Input() maxWidth = 'auto';

  @Output() selected = new EventEmitter<any>();

  constructor() {
    this.rangeCtrl.valueChanges.subscribe(text => {
      this.selected.emit(text);
    });
  }

}
