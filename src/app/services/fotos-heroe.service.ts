import { Injectable } from '@angular/core';
import { FotosHeroeInterface } from '../interfaces/fotos-heroe.interface';
import { HeroesBDService } from './heroes-bd.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotosHeroeService {


    constructor(private heroesBDService: HeroesBDService) { }

    // getFotosHeroes(idHeroe: string): any {
    //   return this.heroesBDService.getFotosHeroe(idHeroe);
    // }

    getFotosHeroes(idHeroe: string): Observable<any> {
      return this.heroesBDService.getFotosHeroe(idHeroe).pipe(
        map((data: any) => {
          console.log("Data de las fotos:", data);
          return data.resp;
        })
      );
    }
}

