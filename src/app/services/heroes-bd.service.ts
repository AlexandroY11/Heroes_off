import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS_MONGODB } from '../config/url.servicios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesBDService {

  userToken: any;

  constructor(public http: HttpClient) { }

  // Obtener el token del usuario
  public leerToken(): any  {
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
}
