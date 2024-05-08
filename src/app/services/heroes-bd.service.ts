import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS_MONGODB } from '../config/url.servicios';
import { Observable, map } from 'rxjs';
import { HeroeInterface } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesBDService {

  userToken: any;

  constructor(public http: HttpClient) { }

  // Obtener el token del usuario
  public leerToken(): any {
    this.userToken = localStorage.getItem('token') || '';
    return this.userToken;
  }

  // Obtener todos los héroes
  getHeroes(): Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.leerToken());
    const url = `${URL_SERVICIOS_MONGODB}/heroes`;
    return this.http.get(url, { headers });
  }

  // Obtener un héroe por su ID
  getHeroe(id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.leerToken());
    const url = `${URL_SERVICIOS_MONGODB}/heroes/${id}`;
    return this.http.get(url, { headers });
  }

  // Obtener las fotos de un héroe por su ID
  getFotosHeroe(id: string): Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.leerToken());
    const url = `${URL_SERVICIOS_MONGODB}/multimedias/heroe/${id}`;
    return this.http.get(url, { headers });
  }

  crud_Heroes(unHeroe: HeroeInterface, unaAccion: string): any {
    //console.log(unExpediente);

    if (unaAccion === 'eliminar') {
      let parametros2 = new HttpParams();

      let url = `${URL_SERVICIOS_MONGODB}/heroes/${unHeroe._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );
    }

    /*
    nombre: string;
    bio: string;
    img: string;
    aparicion: string;
    casa: string;
    _id?: string;
    */
    if (unaAccion === 'insertar') {
      let parametros2 = new HttpParams();
      let url = URL_SERVICIOS_MONGODB + '/heroes';

      // Begin assigning parameters
      parametros2 = parametros2.append('nombre', unHeroe.nombre);
      parametros2 = parametros2.append('bio', unHeroe.bio);
      parametros2 = parametros2.append('img', unHeroe.img);
      parametros2 = parametros2.append('aparicion', unHeroe.aparicion);
      parametros2 = parametros2.append('casa', unHeroe.casa);

      const body = {
        nombre: unHeroe.nombre,
        bio: unHeroe.bio,
        img: unHeroe.img,
        aparicion: unHeroe.aparicion,
        casa: unHeroe.casa,
      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      let parametros = new HttpParams();

      let url = `${URL_SERVICIOS_MONGODB}/heroes/${unHeroe._id}`;

      //let url = URL_SERVICIOS_MONGODB + '/heroes';

      // Begin assigning parameters
      parametros = parametros.append('nombre', unHeroe.nombre);
      parametros = parametros.append('bio', unHeroe.bio);
      parametros = parametros.append('img', unHeroe.img);
      parametros = parametros.append('aparicion', unHeroe.aparicion);
      parametros = parametros.append('casa', unHeroe.casa);

      const body = {
        nombre: unHeroe.nombre,
        bio: unHeroe.bio,
        img: unHeroe.img,
        aparicion: unHeroe.aparicion,
        casa: unHeroe.casa,
      };

      //console.log(parametros);
      return this.http.put(url, body).pipe(map((data) => data));
    }
  }
}
