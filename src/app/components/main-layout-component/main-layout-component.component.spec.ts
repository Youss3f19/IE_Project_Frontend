import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponentComponent } from './main-layout-component.component';

describe('MainLayoutComponentComponent', () => {
  let component: MainLayoutComponentComponent;
  let fixture: ComponentFixture<MainLayoutComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayoutComponentComponent]
    });
    fixture = TestBed.createComponent(MainLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
