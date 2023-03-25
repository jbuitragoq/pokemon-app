import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'component-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {

  public _required = false;
  public showErrorRequired = false;
  public inputTextCtrl = new FormControl();

  @Input() id!: string;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() showError = false;
  @Input() disabled = false;
  @Input() maxWidth = 'auto';
  @Input() icon = '';
  @Input() inputType = 'text';

  @Input() set required(status: boolean) {
    this._required = status;
    if (status) {
      this.inputTextCtrl.setValidators(Validators.required);
    } else {
      this.inputTextCtrl.clearValidators();
    }
    this.inputTextCtrl.reset();
  }

  @Input() set setValue(value: string | null | undefined) {
    this.inputTextCtrl.reset(value, { emitEvent: false });
  }

  @Output() selected = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();

  constructor() {
    this.inputTextCtrl.valueChanges.subscribe(text => {
      this.showErrorRequired = this.inputTextCtrl.touched && this.inputTextCtrl.errors?.['required'];
      this.selected.emit(text);
    });
  }

  onBlur(): void {
    this.blur.emit(this.inputTextCtrl.value);
  }

}
