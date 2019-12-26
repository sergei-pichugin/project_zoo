import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AviariesComponent } from './aviaries.component';

describe('AviariesComponent', () => {
  let component: AviariesComponent;
  let fixture: ComponentFixture<AviariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AviariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AviariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
