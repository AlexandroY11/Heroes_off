import { Component } from '@angular/core';
import { MultimediasHeroeInterface } from '../../interfaces/multimedias';
import { HeroesBDService } from '../../services/heroes-bd.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multimedias-heroe',
  templateUrl: './multimedias-heroe.component.html',
  styleUrl: './multimedias-heroe.component.css'
})
export class MultimediasHeroeComponent {
  multimedias: MultimediasHeroeInterface[] = [];
  idHeroe: any;
  nombreHeroe: string = ''; // Nombre del héroe

  constructor(
    private dataBD: HeroesBDService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idHeroe = params.get('idHeroe');
      this.cargarMultimediasBD();
    });
  }

  cargarMultimediasBD() {
    this.dataBD.getFotosHeroe(this.idHeroe).subscribe((data: any) => {
      this.multimedias = data.resp;
      this.nombreHeroe = this.multimedias[0]?.IdHeroe?.nombre || '';
      console.log(this.multimedias);
    });
  }
}
