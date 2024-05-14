import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMultimediasComponent } from './editar-multimedias.component';

describe('EditarMultimediasComponent', () => {
  let component: EditarMultimediasComponent;
  let fixture: ComponentFixture<EditarMultimediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarMultimediasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMultimediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
