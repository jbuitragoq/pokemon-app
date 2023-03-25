import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'component-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() headers!: Header;
  @Input() dataTypes!: Field[];
  @Input() dataList: any[] = [];
}

interface Header {
  baseTranslate: string,
  headerList: string[]
}

interface Field {
  type: FieldType,
  url?: string,
  actions?: string[]
}

export enum FieldType {
  text = 'text',
  image = 'image',
  action = 'action'
}
