import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-edit-clase',
  templateUrl: './edit-clase.component.html',
  styleUrls: ['./edit-clase.component.scss']
})
export class EditClaseComponent {

  idClase?: number;
  clase: FormGroup;
  claseClass?: any;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private claseService: ClasesService){
      this.clase = this.fb.group({
      nombre: ['', [Validators.required,Validators.maxLength(50)]],
      codigo: ['', [Validators.required,Validators.maxLength(15)]],
      credito: ['', [Validators.required,Validators.maxLength(2)]],
      descripcion: ['', [Validators.required,Validators.maxLength(200)]],
      temario: ['', [Validators.required,Validators.maxLength(200)]]
      });
  }

  ngOnInit(): void{
    this.idClase = this.claseService.idClase;
    this.llenarInfo();
  } 

  llenarInfo(){
    //this.idEstudiante!
    this.claseService.getClase(this.idClase!).subscribe(data => {
      this.claseClass = data;
      this.clase.controls['nombre'].setValue(data.nombreclase);
      this.clase.controls['codigo'].setValue(data.codigo);
      this.clase.controls['credito'].setValue(data.creditos);
      this.clase.controls['descripcion'].setValue(data.descripcion);
      this.clase.controls['temario'].setValue(data.temario);
    }, error => {
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }

  editarClase(){
    this.claseClass.idClase = this.idClase;
    this.claseClass.nombreclase = this.clase.value.nombre;
    this.claseClass.codigo = this.clase.value.codigo;
    this.claseClass.creditos = this.clase.value.credito;
    this.claseClass.descripcion = this.clase.value.descripcion;
    this.claseClass.temario = this.clase.value.temario;

    this.claseService.editarClase(this.claseClass).subscribe(data => {

      if( data.message == "Editado"){
        this.snackBar.open("Clase actualizada!", '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/dashboard/adminClases'])
      }

    }, error => {
      console.log(error.error.message);
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }


}
