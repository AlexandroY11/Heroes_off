import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { MultheroeService } from '../../services/multheroe-service.service';
import { grupoM } from '../../interfaces/grupoM.interface';
import { MultimediasInterface } from '../../interfaces/multimedias.interface';

@Component({
  selector: 'app-editar-multimedias-heroe',
  templateUrl: './editar-multimedias-heroe.component.html',
  styleUrl: './editar-multimedias-heroe.component.css'
})
export class EditarMultimediasHeroeComponent {
  
  idHeroe!: any;
  _idGr!: any;
  unGrupo: grupoM[] = [];
  unHeroe: MultimediasInterface = {
    url: '',
    tipo: '',
    estado: '',
    IdGrupoMultimedia: {
      _id: '',
      nombre: '',
    },
    usuario: '',
    fecha_creacion: '',
    fecha_actualizacion: '',
  };

  unResultado!: any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataBD: HeroesBDService,
    private dataMUlt: MultheroeService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.idHeroe = params['id'];
      console.log('IDHEROE', this.idHeroe);

      if (this.idHeroe != 'nuevo') {
        console.log('Entre a el proceso 1');
        this.cargarHeroeBD();
      }
      this.cargaCombo();
      console.log(this.unHeroe);
    });
  }

  async cargaCombo() {
    await this.dataBD
      .getGrupoMultimedias()
      .toPromise()
      .then((data: any) => {
        this.unGrupo = data.resp;
      });
    console.log('Este es el grupo  ' + this.unGrupo);
  }
  async cargarHeroeBD() {
    //this.cargando = true;
    console.log('Entre a el proceso 2');
    await this.dataBD
      .getMult(this.idHeroe)
      .toPromise()
      .then((data: any) => {
        this.unHeroe = data.resp;
      });
    console.log('Este es la mult ' + this.unHeroe);
  }

  guardar() {
    console.log('Se envio Guardar');
    let combo: any = document.getElementById('imagen');

    let texto: any = combo.options[combo.selectedIndex].text;

    this.unHeroe.IdGrupoMultimedia._id = texto;
    if (this.idHeroe == 'nuevo') {
      console.log('entre a nuevo');
      console.log(this.unHeroe.url);
      console.log(this.unHeroe.IdGrupoMultimedia._id);
      this.nuevoMult();
    } else {
      this.actualizarMult();
    }
  }

  actualizarMult() {
    //console.log(this.unaDivision);
    this.dataMUlt.crud_Multimedias(this.unHeroe, 'modificar').subscribe(
      (res: any) => {
        this.unResultado = res;

        console.log('RESULTADO_ACTUALIZAR', this.unResultado);

        if (this.unResultado.Ok == true) {
          this.unaAccion = 'Mensaje:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);

          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unResultado.msg,
          });

          this.router.navigate(['/listamultimedias']);
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

  async nuevoMult() {
    console.log('entre al metodo');
    await this.dataMUlt.crud_Multimedias(this.unHeroe, 'insertar').subscribe(
      (res: any) => {
        this.unResultado = res;

        console.log('RESULTADO_NUEVO', this.unResultado);

        if (this.unResultado.Ok == true) {
          this.unaAccion = 'Mensaje: multimedia creada';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);

          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unResultado.msg,
          });

          this.router.navigate(['/listamultimedias']);
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