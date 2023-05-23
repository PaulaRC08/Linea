import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CclaseComponent } from './cclase.component';

describe('CclaseComponent', () => {
  let component: CclaseComponent;
  let fixture: ComponentFixture<CclaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CclaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
