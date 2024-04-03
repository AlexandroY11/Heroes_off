import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeInterface } from '../../interfaces/heroe.interface';
import { HeroeTarjetaComponent } from '../heroe-tarjeta/heroe-tarjeta.component';
import { NgFor } from '@angular/common';
import { HeroesBDService } from '../../services/heroes-bd.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes = [];

  // constructor( private data:HeroesService){
  //   this.heroes = data.getHeroes();
  //   console.log(this.heroes)
  // }


  cargando:boolean = false;

  constructor( private data:HeroesBDService){

  }

  async cargarHeroes() {
    this.cargando = true;
    await this.data
      .getHeroes()
      .toPromise()
      .then((resp: any) => {

        this.heroes = resp.resp;

        // console.log("DATOSNUEVOS", this.infoHeroesBD);

        this.cargando = false;
      });
  }

  async cargarData() {
    await this.cargarHeroes();
  }


  ngOnInit() {
    this.heroes = this.data.getHeroes();

    this.cargarData();

    console.log( this.heroes );

  }

}
