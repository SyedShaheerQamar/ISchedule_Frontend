import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrefComponent } from './add-pref.component';

describe('AddPrefComponent', () => {
  let component: AddPrefComponent;
  let fixture: ComponentFixture<AddPrefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPrefComponent]
    });
    fixture = TestBed.createComponent(AddPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
