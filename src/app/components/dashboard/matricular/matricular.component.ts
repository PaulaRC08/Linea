import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EstudianteClase } from 'src/app/models/estudianteclase';
import { ClasesService } from 'src/app/services/clases.service';
import { EstudianteclaseService } from 'src/app/services/estudianteclase.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-matricular',
  templateUrl: './matricular.component.html',
  styleUrls: ['./matricular.component.scss']
})
export class MatricularComponent {

  EstudianteForm: FormGroup;
  Estudiantes: any = [];
  clasesmatriculadas: any = [];

  displayedColumns: string[] = ['index', 'codigo', 'nombreclase', 'creditos', 'matricular'];
  clasessinmatricular: any = [];

  sinBuscar: boolean = false;

  constructor(private fb: FormBuilder,
    private router:Router,
    private snackBar: MatSnackBar,
    private reactiveFormsModule:ReactiveFormsModule,
    private estudianteService: EstudiantesService,
    private estudianteClaseService: EstudianteclaseService,
    private clasesService: ClasesService){
      this.EstudianteForm = this.fb.group({
        idestudiante: ['']
        });
    }
    
  ngOnInit(): void{
    this.llenarEstudiantes();
  }

  clasesMatriculadas(): void{
    this.sinBuscar = true;
    this.estudianteService.getEstudianteClases(this.EstudianteForm.value.idestudiante).subscribe(data =>{
      this.clasesmatriculadas = data.tbEstudianteclases;
    }), (error: { error: { message: any; }; }) => {
      console.log(error.error.message);
    }
    this.clasessinMatricular();
  }

  clasessinMatricular(): void {
    this.clasesService.getClasessinMatricular(this.EstudianteForm.value.idestudiante).subscribe(data =>{
      console.log(data);
      this.clasessinmatricular = data;
    }), (error: { error: { message: any; }; }) => {
      console.log(error.error.message);
    }
  }

  getColor(i: number) {
    if (i % 2 == 0) {
      return "#333333";
    } else{
      return "#091E0A";
    }
  }

  llenarEstudiantes(){
      this.estudianteService.listEstudiantes().subscribe(data => {
        this.Estudiantes = data;
      }, error => {
        this.snackBar.open(" ERROR: "+ (error.error.message), '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      });
    }

  matricularClase(idClase :number){
    const estudianteclase: EstudianteClase ={
      Idestudiante: this.EstudianteForm.value.idestudiante,
      Idclase: idClase
    };

    this.estudianteClaseService.matricularEstudiante(estudianteclase).subscribe(data => {
      this.snackBar.open("Clase Matriculada Exitosamente", '',{
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      this.clasesMatriculadas();
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }
}
