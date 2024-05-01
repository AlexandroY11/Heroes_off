import { Component } from '@angular/core';
import { HeroeInterface } from '../../interfaces/heroe.interface';
import { HeroesBDService } from '../../services/heroes-bd.service';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrl: './list-heroes.component.css'
})
export class ListHeroesComponent {
  heroes: HeroeInterface[] = [];
  cargando: boolean = false;

  constructor(private data: HeroesBDService) { }

  async cargarHeroes() {
    this.cargando = true;
    try {
      const resp = await this.data.getHeroes().toPromise();
      console.log('Respuesta de la API:', resp); // Agrega esta línea
      this.heroes = resp.resp;
    } catch (error) {
      console.error('Error al cargar los héroes:', error);
    } finally {
      this.cargando = false;
    }
  }


  ngOnInit() {
    this.cargarHeroes();
  }
}
