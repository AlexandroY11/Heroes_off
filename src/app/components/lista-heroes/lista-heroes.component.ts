import { Component } from '@angular/core';
import { HeroeInterface } from '../../interfaces/heroe.interface';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-heroes',
  templateUrl: './lista-heroes.component.html',
  styleUrl: './lista-heroes.component.css'
})
export class ListaHeroesComponent {
  Heroes!: HeroeInterface[];

  unResultado!:any;
  unaAccion: string = 'Mensaje';
  unMensaje: string = '';


  constructor(
    private dataBD: HeroesBDService,
    private router: Router,
  ) {
    
  }

  ngOnInit(){
    this.cargarHeroesBD();
  }

  async cargarHeroesBD() {
    //this.cargando = true;
    await this.dataBD
    .getHeroes()
    .toPromise()
    .then((data:any) =>{
      this.Heroes = data.resp;
      console.log(this.Heroes)
    });


  }

  verMultimedias(idHeroe:any){
    this.router.navigate(['/multimedias-heroe', idHeroe]);
  }

  editarHeroe(idHeroe:any){
    this.router.navigate(['/editar-heroe', idHeroe]);
  }

  eliminarHeroe(unHeroe: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataBD.crud_Heroes(unHeroe, 'eliminar').subscribe(
          (res: any) => {
            this.unResultado = res;
  
            if (this.unResultado.Ok == true) {
              Swal.fire({
                icon: 'success',
                title: 'Héroe eliminado',
                text: 'El héroe ha sido eliminado correctamente',
                timer: 5000, // Establece un temporizador de 5 segundos
                timerProgressBar: true, // Muestra una barra de progreso para el temporizador
                didOpen: () => {
                  Swal.showLoading();
                },
              }).then(() => {
                // Esto se ejecuta después de que el usuario cierre el alert de SweetAlert
                this.cargarHeroesBD(); // Recargar la lista de héroes
              });
  
              this.unaAccion = 'Mensaje:';
              this.unMensaje = 'Héroe Eliminado';
              setTimeout(() => (this.unMensaje = ''), 3000);
  
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el héroe',
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
