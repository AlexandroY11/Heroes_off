import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FotosHeroeInterface } from '../../interfaces/fotos-heroe.interface';
import { FotosHeroeService } from '../../services/fotos-heroe.service';

@Component({
  selector: 'app-fotos-heroe',
  templateUrl: './fotos-heroe.component.html',
  styleUrls: ['./fotos-heroe.component.css']
})
export class FotosHeroeComponent implements OnInit {
  idHeroe!: string;
  nombreHeroe!: string;
  fotos: FotosHeroeInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private fotosHeroeService: FotosHeroeService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.idHeroe = params['id'];
      await this.cargarFotosHeroe(this.idHeroe);
    });
  }

  async cargarFotosHeroe(idHeroe: string) {
    try {
      this.fotos = await this.fotosHeroeService.getFotosHeroes(idHeroe).toPromise();
      this.nombreHeroe = this.fotos.length > 0 ? this.fotos[0].nombreHeroe : ''; 
    } catch (error) {
      console.error('Error al cargar las fotos del héroe:', error);
    }
  }
}
