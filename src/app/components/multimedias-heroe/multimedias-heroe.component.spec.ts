import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediasHeroeComponent } from './multimedias-heroe.component';

describe('MultimediasHeroeComponent', () => {
  let component: MultimediasHeroeComponent;
  let fixture: ComponentFixture<MultimediasHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultimediasHeroeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultimediasHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
