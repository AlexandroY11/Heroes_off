import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { MultheroeService } from '../../services/multheroe-service.service';
import { grupoM } from '../../interfaces/grupoM.interface';
import { MultimediaHeroe, MultimediasInterface } from '../../interfaces/multimedias.interface';
import { HeroeInterface } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-editar-multimedias-heroe',
  templateUrl: './editar-multimedias-heroe.component.html',
  styleUrl: './editar-multimedias-heroe.component.css'
})
export class EditarMultimediasHeroeComponent {
  idHeroe!: any;

  unMultimedia: MultimediasInterface[] = [];
  unHeroe: HeroeInterface[] = [];
  multimedia!: string;
  receivedData!: string;

  unResultado!: any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';
  UnRelacion: MultimediaHeroe = {
    _id: '',
    IdHeroe: '',
    IdMultimedia: '',
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataBD: HeroesBDService,
    private dataMUlt: MultheroeService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.idHeroe = params['idHeroe'];
      console.log('IDHEROE', this.idHeroe);

      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        this.receivedData = navigation.extras.state['data'];
        console.log("ID HEROE MULT"+this.receivedData)
      }

      if (this.idHeroe != 'nuevo') {
        console.log('Entre a el proceso 1');
        this.cargarHeroeBD();
      }
      this.cargaComboHeroes();
      this.cargaComboUrl();
      console.log(this.unHeroe);
    });
  }

  async cargaComboHeroes() {
    await this.dataBD
      .getHeroesSantiago()
      .toPromise()
      .then((data: any) => {
        this.unHeroe = data.resp;
      });
    console.log('Este es el grupo  ' + this.unMultimedia);
  }
  async cargaComboUrl() {
    let mult: (string | number | null)[] = [];
    mult = await this.dataMUlt.getMultHeroesSantiago();
    console.log('heroe ' + mult + "mult");
    this.unMultimedia = mult
      .filter((item) => item !== null) // Filtrar los elementos que son diferentes de null
      .map((item) => item as any); // Acceder a la propiedad IdMultimedia.url de manera segura
    console.log('Despues ' + this.unMultimedia);
  }

  obtenerImagen() {
    //para obtener el texto
    let combo: any = document.getElementById('imagen');

    let texto: any = combo.options[combo.selectedIndex].text;

    console.log(texto);
    this.multimedia = texto;

    console.log(this.multimedia);
    //para obtener el numero y hacer operaciones
    //numero=(texto.split("(")[1].split("$)")[0]);
    //console.log(numero*5);
  }

  async cargarHeroeBD() {
    //this.cargando = true;
    console.log('Entre a el proceso 2');
    await this.dataBD
      .getHeroeMult(this.idHeroe)
      .toPromise()
      .then((data: any) => {
        this.UnRelacion = data.resp;
      });
    console.log('Este es la mult ' + this.unHeroe);
  }

  guardar() {
    console.log('Se envio Guardar');
    // let combo: any = document.getElementById('imagen');

    // let texto: any = combo.options[combo.selectedIndex].text;

    //this.unHeroe.IdGrupoMultimedia._id = texto;

    console.log(this.UnRelacion.IdHeroe);
    console.log(this.UnRelacion.IdMultimedia);
    console.log(this.UnRelacion._id);
    if (this.idHeroe == 'nuevo') {

      console.log('entre a nuevo');
      //console.log(this.unHeroe.url);
      //console.log(this.unHeroe.IdGrupoMultimedia._id);
      this.UnRelacion.IdHeroe = this.receivedData
      this.nuevoMultHeroe();
    } else {
      this.actualizarMultHeroe();
    }
  }

  actualizarMultHeroe() {
    //console.log(this.unaDivision);
    console.log("ID HEROE: "+this.UnRelacion.IdHeroe)
    console.log("ID MULTIMEDIA: "+this.UnRelacion.IdMultimedia)
    console.log("ID: "+this.UnRelacion._id)
    this.dataMUlt
      .crud_multimediasHeroes(this.UnRelacion, 'modificar')
      .subscribe(
        (res: any) => {
          this.unResultado = res;
          //console.log('/listmultheroe/'+this.UnRelacion.IdHeroe)
          console.log('RESULTADO_ACTUALIZAR', this.unResultado);

          if (this.unResultado.Ok == true) {

            this.unaAccion = 'Mensaje:';
            this.unMensaje = this.unResultado.msg;
            setTimeout(() => (this.unMensaje = ''), 3000);

            Swal.fire({
              icon: 'success',
              title: 'Multimedia actualizada',
              text: "Actualizado correctamente"
            });

            this.router.navigate([`/multimedias-heroe/${this.UnRelacion.IdHeroe}`]);
          } else {
            this.unaAccion = 'Error:';
            this.unMensaje = 'No se pudo cargar';//this.unResultado.error.msg;
            setTimeout(() => (this.unMensaje = ''), 3000);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  async nuevoMultHeroe() {
    console.log('entre al metodo');
    await this.dataMUlt
      .crud_multimediasHeroes(this.UnRelacion, 'insertar')
      .subscribe(
        (res: any) => {
          this.unResultado = res;

          console.log('RESULTADO_NUEVO', this.unResultado);

          if (this.unResultado.Ok == true) {
            this.unaAccion = 'Mensaje: multimedia creada';
            this.unMensaje = this.unResultado.msg;
            setTimeout(() => (this.unMensaje = ''), 3000);

            Swal.fire({
              icon: 'success',
              title: 'Multimedia creada',
              text: "Credo exitosamente",
            });

            this.router.navigate([`/multimedias-heroe/${this.UnRelacion.IdHeroe}`]);
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