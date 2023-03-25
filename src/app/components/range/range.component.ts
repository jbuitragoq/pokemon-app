import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'component-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeComponent {

  @Input() id!: string;
  @Input() label = '';
  @Input() minRange = 0;
  @Input() maxRange = 100;
  @Input() stepRange = 2;
  @Input() actualRange = 0;
  @Input() maxWidth = 'auto';

  @Output() selected = new EventEmitter<any>();

  changeRange(event: any): void {
    this.selected.emit(event.target.value);
  }

}
