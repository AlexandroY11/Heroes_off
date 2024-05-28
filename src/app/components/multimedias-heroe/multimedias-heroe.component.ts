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

  eliminarMult(unIdHeroe:any) {
    console.log("ID A BORRAR: "+unIdHeroe);
    this.data.crud_multimediasHeroes(unIdHeroe, 'eliminar').subscribe(
      (res: any) => {
        this.unResultado = res;

        //console.log(this.unResultado);
        if (this.unResultado.Ok == true) {

          Swal.fire({
            icon: 'success',
            title: 'Information',
            text: 'Eliminado correctamente',
          });

          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Heroe Eliminado';
          setTimeout(() => (this.unMensaje = ''), 3000);


          this.ngOnInit() ;

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
      ,(error:any) => {
        console.error(error)
      }
    );
  }

  editarMult(unIdHeroe:any){
    this.router.navigate(['/editar-multimedia-heroe', unIdHeroe]);
  }
  NuevoMult(){
    this.router.navigate(['/editar-multimedia-heroe', 'nuevo'], { state: { data: this.idHeroe  } });
  }
}
