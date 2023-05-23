import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filtro } from '../models/filtro';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  idUsuario?: number;
  idEstudiante?: number;

  myAppUrl: string;
  myApiUrl: string; 

  constructor( private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl='/api/Estudiantes';
  }

  getEstudiante(idEstudiante: number): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl+"/"+idEstudiante);
  }

  getEstudianteUsuario(idUsuario: number): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl+"/estudianteUser/"+idUsuario);
  }

  getEstudianteClases(idUsuario: number): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl+"/estudianteClases/"+idUsuario);
  }

  eliminarEstudiante(idUsuario: number): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl+"/deleteEstudiante/"+idUsuario);
  }

  editarEstudiante(estudiante: any): Observable<any> {
    return this.http.put(this.myAppUrl+this.myApiUrl+'/'+estudiante.idestudiante, estudiante);
  }

  listEstudiantes(): Observable<any> {
    return this.http.get(this.myAppUrl+this.myApiUrl);
  }

  filtrolistEstudiantes(filtro: Filtro): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl,filtro);
  }

  addEstudiante(estudiante: Estudiante): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl+"/add",estudiante);
  }

}
