import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClaseComponent } from './edit-clase.component';

describe('EditClaseComponent', () => {
  let component: EditClaseComponent;
  let fixture: ComponentFixture<EditClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
