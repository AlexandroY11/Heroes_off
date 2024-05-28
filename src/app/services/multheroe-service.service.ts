import { Injectable } from '@angular/core';
import { HeroesBDService } from './heroes-bd.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { URL_SERVICIOS_MONGODB } from '../config/url.servicios';
import { MultimediasInterface } from '../interfaces/multimedias.interface';
import { multHeroe } from '../interfaces/multHeroe.interface';

@Injectable({
  providedIn: 'root',
})
export class MultheroeService {
  private multheroe: multHeroe[] = [];

  constructor(private dataBD: HeroesBDService, public http: HttpClient) { }

  async getMultHeroe(idx: number) {
    let infoHeroesBD: any;
    let galleryArr: (string | number | null)[] = [];

    await this.dataBD
      .getHeroe(String(idx))
      .toPromise()
      .then((resp: any) => {
        infoHeroesBD = resp.resp;
        console.log('LLegamos aqui');
        console.log('Datos nuevos2 ', infoHeroesBD);
      });

    let NombreHeroe = '';
    for (let i = 0; i < infoHeroesBD.length; i++) {
      let heroe = infoHeroesBD[i];

      console.log('heroe1', heroe);

      let id = heroe.IdHeroe._id;
      console.log('id', id);
      console.log('idx', idx);
      if (idx == id) {
        console.log('entre');
        console.log('heroe2', heroe);
        NombreHeroe = heroe.Nombre;
        galleryArr.push(heroe);
      }
    }
    return galleryArr;
  }

  async getMultHeroes() {
    let infoHeroesBD: any;
    let galleryArr: (string | number | null)[] = [];

    await this.dataBD
      .getMultimedias()
      .toPromise()
      .then((resp: any) => {
        infoHeroesBD = resp.resp;
        console.log('LLegamos aqui');
        console.log('Datos nuevos2 ', infoHeroesBD);
      });

    let NombreHeroe = '';
    for (let i = 0; i < infoHeroesBD.length; i++) {
      let heroe = infoHeroesBD[i];

      console.log('heroe1', heroe);
      console.log('entre');
      console.log('heroe2', heroe);
      galleryArr.push(heroe);
    }
    return galleryArr;
  }

  crud_Multimedias(unaMultimedia: MultimediasInterface, unaAccion: string): any {

    if (unaAccion === 'eliminar') {
      // console.log(unaMultimedia);
      console.log("hola");
      let parametros2 = new HttpParams();

      let url = `${URL_SERVICIOS_MONGODB}/multimedias/${unaMultimedia._id}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );
    }

    if (unaAccion === 'insertar') {
      let parametros2 = new HttpParams();
      let url = URL_SERVICIOS_MONGODB + '/multimedias';

      console.log(url);
      parametros2 = parametros2.append('url', unaMultimedia.url);
      parametros2 = parametros2.append(
        'IdGrupoMultimedia._id',
        unaMultimedia.IdGrupoMultimedia._id
      );
      unaMultimedia.tipo = 'image';
      unaMultimedia.estado = 'true';

      console.log(
        unaMultimedia.url +
        '\n' +
        unaMultimedia.IdGrupoMultimedia._id +
        '\n' +
        unaMultimedia.tipo +
        '\n' +
        unaMultimedia.estado +
        '\n'
      );
      const body = {
        url: unaMultimedia.url,
        tipo: unaMultimedia.tipo,
        IdGrupoMultimedia: unaMultimedia.IdGrupoMultimedia._id,
        estado: unaMultimedia.estado,
      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      let parametros = new HttpParams();

      let url = `${URL_SERVICIOS_MONGODB}/multimedias/${unaMultimedia._id}`;

      parametros = parametros.append('url', unaMultimedia.url);
      parametros = parametros.append(
        'IdGrupoMultimedia._id',
        unaMultimedia.IdGrupoMultimedia._id
      );
      unaMultimedia.tipo = 'image';
      unaMultimedia.estado = 'true';

      const body = {
        url: unaMultimedia.url,
        tipo: unaMultimedia.tipo,
        IdGrupoMultimedia: unaMultimedia.IdGrupoMultimedia._id,
      };

      return this.http.put(url, body).pipe(map((data) => data));
    }
  }

  
}