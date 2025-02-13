import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AviariesCountComponent } from './aviaries-count.component';

describe('AviariesCountComponent', () => {
  let component: AviariesCountComponent;
  let fixture: ComponentFixture<AviariesCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AviariesCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AviariesCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
