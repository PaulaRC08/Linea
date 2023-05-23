import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/models/userlogin';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { LoginService } from 'src/app/services/login.service';
import { PasswordStrengthValidator } from 'src/app/shared/Util/password-strength.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  login: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private reactiveFormsModule:ReactiveFormsModule,
    private estudianteService: EstudiantesService,
    private loginService: LoginService){
      this.login = this.fb.group({
      usuario: ['', [Validators.required,Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]]
      });
  }

  loginClick(): void{
    this.loading = true;
    const userlogin: UserLogin ={
      Usuario: this.login.value.usuario,
      Pass: this.login.value.password,
    };
    
    this.loginService.login(userlogin).subscribe(data => {
      
      if(data.message=="Datos incorrectos"){
        this.login.reset();
        this.loading = false;
        this.snackBar.open(" Datos Incorrectos", '',{
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }else{
        this.loading = false;
        this.loginService.setLocalStorage(data.message.token);
        
        var tokenDecod = this.loginService.getTokenDecoded();
        console.log(tokenDecod);
        var rol = tokenDecod["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        console.log(rol);
        if(rol=="True"){
          this.loginService.Administrador = true;
          console.log("Administrador");
          this.router.navigate(['/dashboard/admin'])
        }else{
          this.loginService.Administrador = false;
          this.estudianteService.idUsuario = data.idusuario;
          console.log("Estudiante");
          this.router.navigate(['/dashboard/estudiante'])
        }


        /*
        if(data.administrador==true){
          this.loginService.Administrador = true;
          this.router.navigate(['/dashboard/admin'])
        }else{
          this.loginService.Administrador = false;
          this.estudianteService.idUsuario = data.idusuario;
          this.router.navigate(['/dashboard/estudiante'])
        }*/
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
