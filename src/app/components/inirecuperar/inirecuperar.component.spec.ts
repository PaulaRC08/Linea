import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InirecuperarComponent } from './inirecuperar.component';

describe('InirecuperarComponent', () => {
  let component: InirecuperarComponent;
  let fixture: ComponentFixture<InirecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InirecuperarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InirecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
