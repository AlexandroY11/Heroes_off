import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FotosTarjetaComponent } from '../fotos-tarjeta/fotos-tarjeta.component';
import { FotosHeroeInterface } from '../../interfaces/fotos-heroe.interface'; 
import { FotosHeroeService } from '../../services/fotos-heroe.service';

@Component({
  selector: 'app-fotos-heroes',
  templateUrl: './fotos-heroes.component.html',
  styleUrl: './fotos-heroes.component.css'
})
export class FotosHeroesComponent {
  fotosHeroes:FotosHeroeInterface[] = [];

  constructor( private data:FotosHeroeService){
    this.fotosHeroes = data.getFotosHeroes();
    console.log(this.fotosHeroes)
  }
}
