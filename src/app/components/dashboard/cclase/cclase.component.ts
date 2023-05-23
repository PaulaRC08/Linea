import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-cclase',
  templateUrl: './cclase.component.html',
  styleUrls: ['./cclase.component.scss']
})
export class CclaseComponent {

  clase: FormGroup;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private claseService: ClasesService){
      this.clase = this.fb.group({
      nombre: ['', [Validators.required,,Validators.maxLength(50)]],
      codigo: ['', [Validators.required,Validators.maxLength(15)]],
      credito: ['', [Validators.required,Validators.maxLength(2)]],
      descripcion: ['', [Validators.required,Validators.maxLength(200)]],
      temario: ['', [Validators.required,Validators.maxLength(200)]]
      });
  }

  guardarClase(): void{
    const clase: Clase ={
      nombreclase: this.clase.value.nombre,
      codigo: this.clase.value.codigo,
      creditos: this.clase.value.credito,
      descripcion: this.clase.value.descripcion,
      temario: this.clase.value.temario
    };

    this.claseService.addClase(clase).subscribe(data => {
      if(data.message=="Clase ya Existe"){
        this.snackBar.open("Codigo Clase existente", '',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }else if (data.message=="Clase creada Exitosamente!"){
        this.snackBar.open("Clase Creada Exitosamente", '',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.clase.reset();
      }
    }, error => {
      //this.loading = false;
      console.log(error);
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }

}
