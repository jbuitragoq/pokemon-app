import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AlertComponent,
        ButtonComponent
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // clickButton

  it('clickButton: should validate the process and emit click to the cancel button', () => {
    component.showAlert = true;
    const spy1 = jest.spyOn(component.clickAccept, 'emit').mockImplementation();
    const spy2 = jest.spyOn(component.clickCancel, 'emit').mockImplementation();
    component.clickButton(0);
    expect(spy1).not.toBeCalled();
    expect(spy2).toBeCalledTimes(1);
    expect(component.showAlert).toBeFalsy();
  });

  it('clickButton: should validate the process and emit click to the accept button', () => {
    const spy1 = jest.spyOn(component.clickAccept, 'emit').mockImplementation();
    const spy2 = jest.spyOn(component.clickCancel, 'emit').mockImplementation();
    component.clickButton(1);
    expect(spy1).toBeCalledTimes(1);
    expect(spy2).not.toBeCalled();
  });
});
