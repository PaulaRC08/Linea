import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaestudianteComponent } from './fichaestudiante.component';

describe('FichaestudianteComponent', () => {
  let component: FichaestudianteComponent;
  let fixture: ComponentFixture<FichaestudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaestudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
