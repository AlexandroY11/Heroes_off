import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { HeroeInterface } from '../../interfaces/heroe.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-heroe',
  templateUrl: './editar-heroe.component.html',
  styleUrl: './editar-heroe.component.css'
})
export class EditarHeroeComponent {


  idHeroe!: any;

  unHeroe: HeroeInterface = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: '',
    _id: '-1',
  };

  unResultado!:any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataBD: HeroesBDService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.idHeroe = params['idheroe'];
      console.log('IDHEROE', this.idHeroe);

      if (this.idHeroe != 'nuevo') {
        this.cargarHeroeBD();
      }
      console.log(this.unHeroe)

    });


  }

  async cargarHeroeBD() {
    //this.cargando = true;
    await this.dataBD
      .getHeroe(this.idHeroe)
      .toPromise()
      .then((data: any) => {
        this.unHeroe = data.resp;
      });
  }


  guardar(){
    console.log("Se envio Guardar");
    if (this.idHeroe == 'nuevo') {

      this.nuevoHeroe();

    } else {

      this.actualizarHeroe();

    }



  }

  actualizarHeroe() {
    //console.log(this.unaDivision);
    this.dataBD.crud_Heroes(this.unHeroe, 'modificar').subscribe(
      (res: any) => {
        this.unResultado = res;

        console.log('RESULTADO_ACTUALIZAR', this.unResultado);

        if (this.unResultado.Ok == true) {
          this.unaAccion = 'Mensaje:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);

          Swal.fire({
            icon: 'success',
            title: 'Héroe actualizado',
            text: "Actualizado correctamente",
          });

          this.router.navigate(['/heroes']);
        } else {
          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.error.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  async nuevoHeroe() {
    await this.dataBD.crud_Heroes(this.unHeroe, 'insertar').subscribe(
      (res: any) => {
        this.unResultado = res;

        console.log('RESULTADO_NUEVO', this.unResultado);

        if (this.unResultado.Ok == true) {
          Swal.fire({
            icon: 'success',
            title: 'Héroe creado',
            text: "Creado correctamente",
          });

          this.unaAccion = 'Mensaje:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);

          this.router.navigate(['/heroes']);
        } else {
          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }



}
