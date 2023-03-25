import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { RangeComponent } from './range.component';

describe('RangeComponent', () => {
  let component: RangeComponent;
  let fixture: ComponentFixture<RangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        RangeComponent
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // setValue

  it('setValue: should set a new value for the actual range', () => {
    component.actualRange = 0;
    component.setValue = 13;
    expect(component.actualRange).toEqual(13);
  });

  // changeRange

  it('changeRange: should emit the value received', () => {
    const spy = jest.spyOn(component.selected, 'emit').mockImplementation();
    component.changeRange({ target: { value: 11 }});
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toEqual(11);
  });
});
