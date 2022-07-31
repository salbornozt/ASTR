import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionDialogComponent } from './cotizacion-dialog.component';

describe('CotizacionDialogComponent', () => {
  let component: CotizacionDialogComponent;
  let fixture: ComponentFixture<CotizacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
