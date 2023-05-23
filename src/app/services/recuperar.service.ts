import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Token } from '../models/cambiarPass';

@Injectable({
  providedIn: 'root'
})
export class RecuperarService {

  myAppUrl: string;
  myApiUrl: string; 

  constructor( private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl='/api/recuperar';
  }

  usuario(usuario: User):Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl, usuario);
  }
  
  cambiarPass(token: Token):Observable<any>{
    return this.http.put(this.myAppUrl+this.myApiUrl+"/CambiarPassword", token);
  }

}
