import { Component, OnInit } from '@angular/core';
import { MultimediasInterface } from '../../interfaces/multimedias.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesBDService } from '../../services/heroes-bd.service';
import Swal from 'sweetalert2';
import { MultheroeService } from '../../services/multheroe-service.service';
import { HeroeInterface } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-lista-multimedias',
  templateUrl: './lista-multimedias.component.html',
  styleUrls: ['./lista-multimedias.component.css']
})
export class ListaMultimediasComponent implements OnInit {
  multimedias: MultimediasInterface[] = [];

  Heroes!: HeroeInterface[];

  unResultado!: any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';

  constructor(
    private dataBD: HeroesBDService,
    private data: MultheroeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMultimediasBD();
  }


cargarMultimediasBD() {
    this.dataBD.getFotos().subscribe((data: any) => {
        this.multimedias = data.resp;
        console.log(this.multimedias);
    });
}


  editarMultimedia(idMultimedia: string) {
    this.router.navigate(['/editar-multimedia', idMultimedia]);
  }

  eliminarMultimedia(unHeroe: any) {
    this.data.crud_Multimedias(unHeroe, 'eliminar').subscribe(
      (res: any) => {
        this.unResultado = res;
        if (this.unResultado.Ok == true) {

          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Multimedia Eliminado',
          });
          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Multimedia Eliminada';
          setTimeout(() => (this.unMensaje = ''), 5000);
          location. reload()

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
