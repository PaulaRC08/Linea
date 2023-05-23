import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RecuperarService } from 'src/app/services/recuperar.service';

@Component({
  selector: 'app-inirecuperar',
  templateUrl: './inirecuperar.component.html',
  styleUrls: ['./inirecuperar.component.scss']
})
export class InirecuperarComponent {

  user: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private recuperarService: RecuperarService){
      this.user = this.fb.group({
      usuario: ['', [Validators.required,Validators.maxLength(20)]],
      });
  }
  
  recuperarClick(): void{
    this.loading = true;
    const user: User ={
      Usuario: this.user.value.usuario
    };
    
    this.recuperarService.usuario(user).subscribe(data => {
      console.log(data);
      if(data.message=="No existe"){
        this.loading = false;
        this.user.reset();
        this.snackBar.open("No existe el Usuario "+user.Usuario, '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }else{
        this.loading = false;
        this.snackBar.open("Correo de recuperacion enviado", '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/inicio'])
      }
    }, error => {
      this.loading = false;
      console.log(error);
      this.snackBar.open(" ERROR: "+ (error.error.message), '',{
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    });
  }

}
