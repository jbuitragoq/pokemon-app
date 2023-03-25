import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'component-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {

  @Input() showAlert = false;
  @Input() description = '';
  @Input() showCancel = false;
  @Output() clickAccept = new EventEmitter<void>();
  @Output() clickCancel = new EventEmitter<void>();

  clickButton(process: number): void {
    if (process === 0) {
      this.clickCancel.emit();
    } else {
      this.clickAccept.emit();
    }
    this.showAlert = false;
  }
}
