import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'component-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() disabled = false;
  @Input() minWidth = '8rem';
  @Input() margin = 'auto';
  @Input() icon = '';
  @Output() click = new EventEmitter<void>();

}
