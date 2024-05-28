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
    Swal.fire({
      title: '¿Estás seguro de eliminar la multimedia?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.crud_Multimedias(unHeroe, 'eliminar').subscribe(
          (res: any) => {
            this.unResultado = res;
            if (this.unResultado.Ok == true) {
              Swal.fire({
                icon: 'success',
                title: 'Multimedia eliminada',
                text: 'Multimedia eliminada correctamente',
                timer: 5000, // Establece un temporizador de 5 segundos
                timerProgressBar: true, // Muestra una barra de progreso para el temporizador
                didOpen: () => {
                  Swal.showLoading();
                },
              }).then(() => {
                // Esto se ejecuta después de que el usuario cierre el alert de SweetAlert
                location.reload(); // Recargar la página
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la multimedia',
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
    });
  }
  
}
