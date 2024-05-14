import { Component, OnInit } from '@angular/core';
import { MultimediasInterface } from '../../interfaces/multimedias';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesBDService } from '../../services/heroes-bd.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-multimedias',
  templateUrl: './lista-multimedias.component.html',
  styleUrls: ['./lista-multimedias.component.css']
})
export class ListaMultimediasComponent implements OnInit {
  multimedias: MultimediasInterface[] = [];

  constructor(
    private dataBD: HeroesBDService,
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

  eliminarMultimedia(unaMultimedia: MultimediasInterface) {
    this.dataBD.crud_Multimedias(unaMultimedia, 'eliminar').subscribe(
      (res: any) => {
        if (res.Ok) {
          Swal.fire({
            icon: 'info',
            title: 'Información',
            text: 'Multimedia Eliminada',
          });
          this.cargarMultimediasBD();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.msg,
          });
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
