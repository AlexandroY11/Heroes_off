import { Injectable } from '@angular/core';
import { HeroeInterface } from '../interfaces/heroe.interface';
import { HeroesBDService } from './heroes-bd.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private heroesBDService: HeroesBDService) { }

  getHeroes(): Observable<any> {
    return this.heroesBDService.getHeroes();
  }

  getHeroe(id: string): Observable<any> {
    return this.heroesBDService.getHeroe(id).pipe(
      map((data: any) => {
        return data.resp;
      })
    );
  }
}