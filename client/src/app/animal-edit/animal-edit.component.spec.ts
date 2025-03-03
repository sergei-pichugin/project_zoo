import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalEditComponent } from './animal-edit.component';

describe('AnimalEditComponent', () => {
  let component: AnimalEditComponent;
  let fixture: ComponentFixture<AnimalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
