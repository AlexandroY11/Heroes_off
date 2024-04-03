import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FotosHeroeInterface } from '../../interfaces/fotos-heroe.interface';
import { FotosHeroeService } from '../../services/fotos-heroe.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-fotos-heroe',
  templateUrl: './fotos-heroe.component.html',
  styleUrl: './fotos-heroe.component.css'
})
export class FotosHeroeComponent {
  idHeroe!: number;
  nombreHeroe!: string;
  url!: string;
  fotos: FotosHeroeInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private fotosHeroeService: FotosHeroeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idHeroe = +params['id'];
      this.fotos = this.fotosHeroeService.getFotoHeroe(this.idHeroe);
      this.nombreHeroe = this.fotos.length > 0 ? this.fotos[0].nombreHeroe : ''; 
      this.url = this.fotos.length > 0 ? this.fotos[0].url : ''; 
      console.log(this.fotos);
    });
  }
}
