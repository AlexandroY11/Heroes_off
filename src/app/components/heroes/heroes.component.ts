import { Component } from '@angular/core';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { HeroeInterface } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes: HeroeInterface[] = [];
  cargando: boolean = false;

  constructor(private data: HeroesBDService) {}

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
