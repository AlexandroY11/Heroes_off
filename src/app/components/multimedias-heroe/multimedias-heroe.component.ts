import { Component, OnInit } from '@angular/core';
import { MultimediasHeroeInterface } from '../../interfaces/multimedias.interface';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multimedias-heroe',
  templateUrl: './multimedias-heroe.component.html',
  styleUrls: ['./multimedias-heroe.component.css']
})
export class MultimediasHeroeComponent implements OnInit {
  multimedias: MultimediasHeroeInterface[] = [];
  idHeroe: string | null = null;
  nombreHeroe: string = '';
  unResultado: any;
  unaAccion: string = '';
  unMensaje: string = '';

  constructor(
    private dataBD: HeroesBDService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idHeroe = params.get('idHeroe');
      if (this.idHeroe) {
        this.cargarMultimediasBD();
      }
    });
  }

  cargarMultimediasBD() {
    if (!this.idHeroe) return;
    this.dataBD.getFotosHeroe(this.idHeroe).subscribe((data: any) => {
      this.multimedias = data.resp;
      this.nombreHeroe = this.multimedias[0]?.IdHeroe?.nombre || '';
      console.log(this.multimedias);
    });
  }

  eliminarMultimedia(idMultimedia: string) {
    if (!this.idHeroe) return;

    console.log("ID A BORRAR: " + idMultimedia);
    const multimediaHeroe = { 
      _id: idMultimedia, 
      IdHeroe: '', 
      IdMultimedia: '' 
    };

    this.dataBD.crudMultimediasHeroe(multimediaHeroe, 'eliminar').subscribe(
      (res: any) => {
        this.unResultado = res;

        if (this.unResultado.Ok === true) {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Relacion Eliminada',
          });

          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Heroe Eliminado';
          setTimeout(() => (this.unMensaje = ''), 3000);

          this.ngOnInit();
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
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  editarMultimedia(id: string) {
    this.router.navigate(['/editar-multimedia-heroe', id]);
  }

  nuevaMultimedia() {
    this.router.navigate(['/editar-multimedia-heroe', 'nuevo']);
  }
}
