import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMultimediasHeroeComponent } from './editar-multimedias-heroe.component';

describe('EditarMultimediasHeroeComponent', () => {
  let component: EditarMultimediasHeroeComponent;
  let fixture: ComponentFixture<EditarMultimediasHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarMultimediasHeroeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMultimediasHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
