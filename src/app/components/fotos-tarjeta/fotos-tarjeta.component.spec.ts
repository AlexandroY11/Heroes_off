import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosTarjetaComponent } from './fotos-tarjeta.component';

describe('FotosTarjetaComponent', () => {
  let component: FotosTarjetaComponent;
  let fixture: ComponentFixture<FotosTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FotosTarjetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FotosTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
