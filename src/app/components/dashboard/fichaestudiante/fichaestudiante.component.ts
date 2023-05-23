import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClasesService } from 'src/app/services/clases.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-fichaestudiante',
  templateUrl: './fichaestudiante.component.html',
  styleUrls: ['./fichaestudiante.component.scss']
})
export class FichaestudianteComponent {

  idEstudiante?: number;
  nombre?: String;
  apellido?: String;
  codigo?: String;
  identificacion?: String;
  clases?: any = [];

  constructor(private router:Router,
    private snackBar: MatSnackBar,
    private reactiveFormsModule:ReactiveFormsModule,
    private estudianteService: EstudiantesService,
    private clasesService: ClasesService){}

  ngOnInit(): void{
    this.idEstudiante = this.estudianteService.idEstudiante;
    this.llenarInfo();
  }  

  llenarInfo(){
    //this.idEstudiante!
    this.estudianteService.getEstudiante(this.idEstudiante!).subscribe(data => {
      
      this.nombre = data.nombre.toUpperCase();
      this.apellido = data.apellido.toUpperCase();
      this.codigo = data.codigoestudiante;
      this.identificacion = data.numeroidentificacion;
      this.clases = data.tbEstudianteclases;
      console.log(this.clases);

    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }

  fichaClase(idClase: number){
    this.clasesService.idClase = idClase;
    this.router.navigate(['/dashboard/fclase'])
  }

  getColor(i: number) {
    if (i % 2 == 0) {
      return "#333333";
    } else{
      return "#091E0A";
    }
  }

  logOut(): void{
    this.router.navigate(['/inicio'])
  }
}
