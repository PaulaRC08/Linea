import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clase } from '../models/clase';
import { FiltroClase } from '../models/filtroClase';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  idClase?: number;
  myAppUrl: string;
  myApiUrl: string; 

  constructor( private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl='/api/Clase';
  }

  getClase(idClase: number): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl+"/"+idClase);
  }

  getClases(): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl);
  }

  getClasessinMatricular(idUsuario: number): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl+"/sinMatricular/"+idUsuario);
  }

  addClase(clase: Clase): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl, clase);
  }

  filtrolistClases(filtroclase: FiltroClase): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl+"/listFiltro",filtroclase);
  }

  eliminarClase(idClase: number): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl+"/deleteClase/"+idClase);
  }

  editarClase(clase: any): Observable<any> {
    return this.http.put(this.myAppUrl+this.myApiUrl+'/'+clase.idClase, clase);
  }

}
