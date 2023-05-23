import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CestudianteComponent } from './cestudiante.component';

describe('CestudianteComponent', () => {
  let component: CestudianteComponent;
  let fixture: ComponentFixture<CestudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CestudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
