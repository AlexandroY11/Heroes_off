import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosHeroesComponent } from './fotos-heroes.component';

describe('FotosHeroesComponent', () => {
  let component: FotosHeroesComponent;
  let fixture: ComponentFixture<FotosHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FotosHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FotosHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
