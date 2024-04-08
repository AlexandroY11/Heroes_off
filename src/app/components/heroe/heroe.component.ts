// heroe.component.ts

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {
  heroe$!: Observable<any>; // Use Observable to handle asynchronous data

  constructor(
    private activatedRoute: ActivatedRoute, 
    private _heroeService: HeroesService
  ) {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.heroe$ = this._heroeService.getHeroe(id); // Assign Observable
    });
  }
}
