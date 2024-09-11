import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefListComponent } from './pref-list.component';

describe('PrefListComponent', () => {
  let component: PrefListComponent;
  let fixture: ComponentFixture<PrefListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefListComponent]
    });
    fixture = TestBed.createComponent(PrefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
