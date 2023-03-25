import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { TableComponent } from './table/table.component';
import { TitleComponent } from './title/title.component';

@NgModule({
    declarations: [
        ButtonComponent,
        InputComponent,
        TableComponent,
        TitleComponent
    ],
    exports: [
        ButtonComponent,
        InputComponent,
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
  