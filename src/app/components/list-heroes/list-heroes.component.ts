import { Component } from '@angular/core';
import { HeroeInterface } from '../../interfaces/heroe.interface';
import { HeroesBDService } from '../../services/heroes-bd.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrl: './list-heroes.component.css'
})
export class ListHeroesComponent {
  heroes: HeroeInterface[] = [];
  cargando: boolean = false;
  router: any;
  unResultado!: any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

  constructor(private data: HeroesBDService) { }

  ngOnInit() {
    this.cargarHeroes();
  }

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

  editarHeroe(unIdHeroe: any) {
    this.router.navigate(['/heroeedit', unIdHeroe]);
  }

  eliminarHeroe(unHeroe: any) {
    //console.log(this.unaDivision);
    this.data.crud_Heroes(unHeroe, 'eliminar').subscribe(
      (res: any) => {
        this.unResultado = res;

        //console.log(this.unResultado);
        if (this.unResultado.Ok == true) {

          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Heroe Eliminado',
          });

          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Heroe Eliminado';
          setTimeout(() => (this.unMensaje = ''), 3000);


          this.cargarHeroes();

        } else {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unResultado.msg,
          });


          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      }
      , (error: any) => {
        console.error(error)
      }
    );
  }
}
