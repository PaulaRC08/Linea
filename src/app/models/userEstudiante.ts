export class UserEstudiante{
    usuario?: string;
    pass?: string;
    email?: string;
    administrador?: boolean = false;
    
    constructor(user: string, p: string, em: string){
        this.usuario = user;
        this.pass = p;
        this.email = em;
    }
}