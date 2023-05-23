import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EstudianteClase } from '../models/estudianteclase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteclaseService {

  myAppUrl: string;
  myApiUrl: string; 

  constructor( private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl='/api/Estudianteclase';
  }

  matricularEstudiante(estudianteclase: EstudianteClase): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl,estudianteclase);
  }

}
