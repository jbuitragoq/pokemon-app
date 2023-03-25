import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() clickImage = new EventEmitter<any>();
  @Output() clickIcon = new EventEmitter<any>();
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
