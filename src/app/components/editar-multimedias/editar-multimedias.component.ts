// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HeroesBDService } from '../../services/heroes-bd.service';
// import { MultimediasInterface } from '../../interfaces/multimedias';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-editar-multimedias',
//   templateUrl: './editar-multimedias.component.html',
//   styleUrl: './editar-multimedias.component.css'
// })

// export class EditarMultimediasComponent implements OnInit {
//   multimedia: MultimediasInterface = {
//     _id: '',
//     url: '',
//     tipo: '',
//     estado: false,
//     IdGrupoMultimedia: {
//       _id: '',
//       nombre: ''
//     },
//     usuario: {
//       nombre: '',
//       _id: ''
//     },
//     fecha_creacion: '',
//     fecha_actualizacion: ''
//   };

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private dataBD: HeroesBDService
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.cargarMultimedia(id);
//     }
//   }

//   cargarMultimedia(id: string): void {
//     this.dataBD.getMultimedia(id).subscribe((data: any) => {
//       this.multimedia = data.resp;
//     });
//   }

//   guardarCambios(): void {
//     this.dataBD.crud_Multimedias(this.multimedia, 'modificar').subscribe((res: any) => {
//       if (res.Ok) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Guardado',
//           text: 'Cambios guardados exitosamente!'
//         }).then(() => {
//           this.router.navigate(['/lista-multimedia']);
//         });
//       } else {
//         console.error('Error al guardar los cambios:', res.msg);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Error al guardar los cambios. Por favor, inténtelo de nuevo.'
//         });
//       }
//     });
//   }

//   cancelar(): void {
//     // Redirigir a la lista de multimedia sin guardar cambios
//     this.router.navigate(['/lista-multimedias']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { MultimediasInterface } from '../../interfaces/multimedias';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-multimedias',
  templateUrl: './editar-multimedias.component.html',
  styleUrls: ['./editar-multimedias.component.css']
})
export class EditarMultimediasComponent implements OnInit {
  multimedia: MultimediasInterface = {
    _id: '',
    url: '',
    tipo: '',
    estado: false,
    IdGrupoMultimedia: {
      _id: '',
      nombre: ''
    },
    usuario: {
      nombre: '',
      _id: ''
    },
    fecha_creacion: '',
    fecha_actualizacion: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataBD: HeroesBDService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'nuevo') {
      this.cargarMultimedia(id);
    }
  }

  cargarMultimedia(id: string): void {
    this.dataBD.getMultimedia(id).subscribe((data: any) => {
      this.multimedia = data.resp;
    });
  }

  guardarCambios(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'nuevo') {
      this.dataBD.crud_Multimedias(this.multimedia, 'insertar').subscribe((res: any) => {
        if (res.Ok) {
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Multimedia agregado exitosamente!'
          }).then(() => {
            this.router.navigate(['/lista-multimedia']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.msg
          });
        }
      });
    } else {
      this.dataBD.crud_Multimedias(this.multimedia, 'modificar').subscribe((res: any) => {
        if (res.Ok) {
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Cambios guardados exitosamente!'
          }).then(() => {
            this.router.navigate(['/lista-multimedia']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.msg
          });
        }
      });
    }
  }

  cancelar(): void {
    // Redirigir a la lista de multimedia sin guardar cambios
    this.router.navigate(['/lista-multimedias']);
  }
}
