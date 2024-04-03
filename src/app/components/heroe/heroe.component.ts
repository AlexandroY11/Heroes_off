import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrl: './heroe.component.css'
})
export class HeroeComponent {
  heroe:any;

  id!: number;

  constructor(
    private activatedRoute: ActivatedRoute, 
    // private _heroeService: HeroesService,
    private _heroeService: HeroesService
  ){
    
      this.activatedRoute.params.subscribe(params=> {
      this.id=params["id"];

      this.heroe= this._heroeService.getHeroe(this.id);

      console.log("DATA", this.id);
    })
  }
}
