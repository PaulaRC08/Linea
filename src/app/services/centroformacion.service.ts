import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { centroFormacion } from '../models/centroFormacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroformacionService {

  myAppUrl: string;
  myApiUrl: string; 

  constructor( private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl='/api/centroformacion';
  }
  
  addCentro(centroFormacion: centroFormacion): Observable<any> {
    return this.http.post(this.myAppUrl+this.myApiUrl,centroFormacion);
  }

}
