import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'component-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
  @Input() text = '';
}
