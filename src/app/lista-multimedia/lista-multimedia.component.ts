import { Component } from '@angular/core';
import { HeroeInterface } from '../interfaces/heroe.interface';
import { HeroesBDService } from '../services/heroes-bd.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-multimedia',
  templateUrl: './lista-multimedia.component.html',
  styleUrl: './lista-multimedia.component.css'
})

export class ListaMultimediaComponent {
  Heroes!: HeroeInterface[];

  unResultado!: any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';


  constructor(
    private dataBD: HeroesBDService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.cargarHeroesBD();
  }

  async cargarHeroesBD() {
    //this.cargando = true;
    await this.dataBD
      .getHeroes()
      .toPromise()
      .then((data: any) => {
        this.Heroes = data.resp;
        console.log(this.Heroes)
      });


  }

  editarMultimedia(idHeroe: any) {
    this.router.navigate(['/editar-', idHeroe]);
  }

  eliminarMultimedia(unHeroe: any) {
    //console.log(this.unaDivision);
    this.dataBD.crud_Multimedia(unHeroe, 'eliminar').subscribe(
      (res: any) => {
        this.unResultado = res;

        //console.log(this.unResultado);
        if (this.unResultado.Ok == true) {

          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Multimedia Eliminado',
          });

          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Multimedia Eliminado';
          setTimeout(() => (this.unMensaje = ''), 3000);


          this.cargarHeroesBD();

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


  editarFotos(unHeroe: any) {

  }
}
