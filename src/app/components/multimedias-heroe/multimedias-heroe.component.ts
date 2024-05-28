import { Component, OnInit } from '@angular/core';
import { MultimediasHeroeInterface } from '../../interfaces/multimedias.interface';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MultheroeService } from '../../services/multheroe-service.service';

@Component({
  selector: 'app-multimedias-heroe',
  templateUrl: './multimedias-heroe.component.html',
  styleUrls: ['./multimedias-heroe.component.css']
})
export class MultimediasHeroeComponent implements OnInit {
  multimedias: MultimediasHeroeInterface[] = [];
  id!: number;
  idHeroe: string | null = null;
  nombreHeroe: string = '';
  unResultado: any;
  unaAccion: string = '';
  unMensaje: string = '';

  constructor(
    private dataBD: HeroesBDService,
    private data: MultheroeService,
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

  eliminarMult(unIdHeroe: any) {
    Swal.fire({
      title: '¿Estás seguro  de eliminar la multimedia?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.crud_multimediasHeroes(unIdHeroe, 'eliminar').subscribe(
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
    });
  }
  

  editarMult(unIdHeroe:any){
    this.router.navigate(['/editar-multimedia-heroe', unIdHeroe]);
  }
  NuevoMult(){
    this.router.navigate(['/editar-multimedia-heroe', 'nuevo'], { state: { data: this.idHeroe  } });
  }
}
