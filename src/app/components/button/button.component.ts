import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'component-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  iconName = '';
  iconUrl = '';

  @Input() id!: string;
  @Input() label!: string;
  @Input() disabled = false;
  @Input() minWidth = '8rem';
  @Input() set icon(name: string) {
    this.iconName = name;
    this.iconUrl = `src/assets/icons/${name}`;
  };
  @Output() click = new EventEmitter<void>();

}
