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
  idHeroe: any;
  nombreHeroe: any;
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
      const response = await this.fotosHeroeService.getFotosHeroes(idHeroe).toPromise();
      if (response && response.length > 0) {
        this.fotos = response.map((item: any) => {
          return {
            id: item._id,
            idHeroe: item.IdHeroe?._id || '', 
            nombreHeroe: item.IdHeroe?.nombre || '', 
            url: item.IdMultimedia?.url || '' 
          };
        });
        this.nombreHeroe = this.fotos.length > 0 ? this.fotos[0].nombreHeroe : ''; 
      } else {
        console.error('Error al cargar las fotos del héroe:', response);
      }
    } catch (error) {
      console.error('Error al cargar las fotos del héroe:', error);
    }
  }
  
  
  
}
