import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { RangeComponent } from './range/range.component';
import { TableComponent } from './table/table.component';
import { TitleComponent } from './title/title.component';

@NgModule({
    declarations: [
        AlertComponent,
        ButtonComponent,
        InputComponent,
        RangeComponent,
        TableComponent,
        TitleComponent
    ],
    exports: [
        AlertComponent,
        ButtonComponent,
        InputComponent,
        RangeComponent,
        TableComponent,
        TitleComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class ComponentsModule { }
  