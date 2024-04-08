import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeroeInterface } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrl: './heroe-tarjeta.component.css'
})
export class HeroeTarjetaComponent {
  @Input() heroe!: HeroeInterface;

  constructor(private router: Router) {
  }

  verHeroe(id: string) {
    this.router.navigate(['/heroe', id]);
  }
  
  verFotosHeroe(id: string) {
    this.router.navigate(['/fotos', id]);
  }
  
}
