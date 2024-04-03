import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosHeroeComponent } from './fotos-heroe.component';

describe('FotosHeroeComponent', () => {
  let component: FotosHeroeComponent;
  let fixture: ComponentFixture<FotosHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FotosHeroeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FotosHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
