import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TitleComponent } from './title/title.component';

@NgModule({
    declarations: [
        TitleComponent
    ],
    exports: [
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
  