import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-fichaclase',
  templateUrl: './fichaclase.component.html',
  styleUrls: ['./fichaclase.component.scss']
})
export class FichaclaseComponent {

  displayedColumns: string[] = ['index', 'nombre', 'codigoestudiante'];

  idClase?: number;
  nombre?: String;
  descripcion?: String;
  temario?: String;
  codigo?: String;
  creditos?: String;
  alumnos?:any = [];

  constructor(private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private snackBar: MatSnackBar,
    private clasesService: ClasesService){}

  ngOnInit(): void{
    this.idClase = this.clasesService.idClase;
    this.llenarInfo();
  } 

  llenarInfo(){
    //this.idEstudiante!
    this.clasesService.getClase(this.idClase!).subscribe(data => {
      
      console.log(data);
      this.nombre = data.nombreclase.toUpperCase();
      this.descripcion = data.descripcion;
      this.codigo = data.codigo;
      this.creditos = data.creditos;
      this.alumnos = data.tbEstudianteclases;
      this.temario = data.temario;
      
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }
  
  logOut(): void{
    this.router.navigate(['/inicio'])
  }
}
