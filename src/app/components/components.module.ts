import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './button/button.component';
import { TitleComponent } from './title/title.component';
import { InputComponent } from './input/input.component';

@NgModule({
    declarations: [
        ButtonComponent,
        InputComponent,
        TitleComponent
    ],
    exports: [
        ButtonComponent,
        InputComponent,
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
  