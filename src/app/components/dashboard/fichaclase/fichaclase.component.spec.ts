import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaclaseComponent } from './fichaclase.component';

describe('FichaclaseComponent', () => {
  let component: FichaclaseComponent;
  let fixture: ComponentFixture<FichaclaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaclaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
