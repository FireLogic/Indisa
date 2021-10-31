import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { VentanaInfoComponent } from '../ventana-info/ventana-info.component';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Constantes } from '../utils/constantes';
import { from as fromPromise } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  mensaje;
  tipoMensaje;
  doLogIn: boolean = false;

  cont = 0;

  fromSignUp: boolean = false;
  trySignUp: boolean = false;

  item: Observable<any>;

  // Variables de entorno para API de eliminar usuario de Firebase.
  readonly URL_API_ELIMINAR_USUARIO = environment.URL_ELIMINAR_USUARIO_FIREBASE;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public dialog: MatDialog,
    private dataService: DataService,
    private http: HttpClient,
    private usuarioService: UsuarioService) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (this.doLogIn) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        }
        else if (this.trySignUp) {
          const loginUser = JSON.parse(localStorage.getItem('login'));
          localStorage.setItem('user', JSON.stringify(loginUser));
          JSON.parse(localStorage.getItem('user'));
        }
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.doLogIn = true;
        this.ngZone.run(() => {
          this.cont++;
          this.router.navigate(['dashboard']);
          (this.cont < 2) ? this.SignIn(email, password) : this.cont = 0;
        });
        localStorage.setItem('login', JSON.stringify(result.user));
        this.getUserData(result.user.uid);
        this.SetUserData(result.user);
      }).catch((error) => {

        this.mensaje = '<b>Correo electrónico</b> o <b>contraseña</b> son incorrectos. Por favor, verifique los datos e intente nuevamente.';

        (error.code == 'auth/invalid-email') ? this.mensaje =
          '<p><b>Correo electrónico inválido</b></p> <p>Por favor, verifique los datos ingresados e intente nuevamente.</p>'
          : this.mensaje;

        (error.code == 'auth/user-not-found') ? this.mensaje =
          '<p><b>Usuario no encontrado</b></p> <p>Por favor, verifique que el correo ingresado sea el correcto e intente nuevamente.</p>'
          : this.mensaje;

        this.tipoMensaje = 'info';

        const dialogRef = this.dialog.open(VentanaInfoComponent, {
          maxWidth: '400px',
          data: { mensaje: this.mensaje, tipo: this.tipoMensaje },
          autoFocus: false,
          maxHeight: '90vh',
        });
      })
  }

  // Set session data for user
  getUserData(uid: string) {
    this.usuarioService.getUsuario(uid)
      .subscribe(res => {
        this.usuarioService.usuario = res as Usuario;
        const user: Usuario = this.usuarioService.usuario[0];
        //this.dataService.setProfileData(user);
        localStorage.setItem('perfil', JSON.stringify(user));
        this.setUserPermissions(user.perfil);
      },
        (err) => {
          this.SignOut();
        }
      )
  }

  // Set permissions for user
  setUserPermissions(perfil: string) {

    let permisos;

    if (perfil == 'administrador') {
      permisos = [Constantes.menuDashboard, Constantes.dashboardPro, Constantes.menuPacientes,
      Constantes.pacientesPro, Constantes.pacientesEdit, Constantes.menuActividades,
      Constantes.actividadesPro, Constantes.menuImagenes, Constantes.imagenes, Constantes.menuAjustes,
      Constantes.perfil, Constantes.categorias, Constantes.usuarios, Constantes.actividadesPlay, Constantes.verbos];
    }
    else if (perfil == 'profesional') {
      permisos = [Constantes.menuDashboard, Constantes.dashboardPro, Constantes.menuPacientes,
      Constantes.pacientesBasic, Constantes.pacientesEdit, Constantes.menuActividades,
      Constantes.actividadesPro, Constantes.menuImagenes, Constantes.imagenes, Constantes.menuAjustes,
      Constantes.perfil, Constantes.categorias, Constantes.actividadesPlay, Constantes.verbos];
    }
    else if (perfil == 'supervisor') {
      permisos = [Constantes.menuDashboard, Constantes.dashboardBasic, Constantes.menuPacientes,
      Constantes.pacientesBasic, Constantes.menuActividades, Constantes.actividadesBasic,
      Constantes.menuAjustes, Constantes.perfil, Constantes.actividadesPlay];
    }
    else if (perfil == 'paciente') {
      permisos = [Constantes.menuDashboard, Constantes.dashboardBasic, Constantes.menuActividades,
      Constantes.actividadesBasic, Constantes.menuAjustes, Constantes.perfil, Constantes.actividadesPlay];
    }

    const permisosUsuario = {
      permisos: permisos
    }

    localStorage.setItem('permisos', JSON.stringify(permisosUsuario));
    //this.dataService.setSessionData(permisos);
  }

  // Sign up with email/password
  SignUp(email, password) {
    this.trySignUp = true;
    this.doLogIn = false;
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.fromSignUp = true;
        this.SendVerificationMail(email);
        this.ForgotPassword(email);
        this.SetUserData(result.user);
        this.dataService.setInfoUser(result);
      }).catch((error) => {
        console.log(error.message);
        this.dataService.setInfoUser(error);
      })

  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail(email) {

    return (await this.afAuth.currentUser).sendEmailVerification()
      .then(() => {
        //this.router.navigate(['verificar-email']);

        this.mensaje = 'Se ha enviado un correo a <b>' + email + '</b> con las instrucciones de acceso a la plataforma.'
        this.tipoMensaje = 'info';

        const dialogRef = this.dialog.open(VentanaInfoComponent, {
          maxWidth: '400px',
          data: { mensaje: this.mensaje, tipo: this.tipoMensaje },
          autoFocus: false,
          maxHeight: '90vh',
        });
      })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {

    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        if (!this.fromSignUp) {
          this.mensaje = 'Se ha enviado un correo a <b>' + passwordResetEmail + '</b> para el restablecimiento de la contraseña.'
          this.tipoMensaje = 'info';
          const dialogRef = this.dialog.open(VentanaInfoComponent, {
            maxWidth: '400px',
            data: { mensaje: this.mensaje, tipo: this.tipoMensaje },
            autoFocus: false,
            maxHeight: '90vh',
          });
          this.fromSignUp = false;
          dialogRef.afterClosed().subscribe(res => {
            this.router.navigate(['login']);
          });
        }

      }).catch((error) => {

        this.mensaje = error;

        (error.code == 'auth/invalid-email') ? this.mensaje =
          '<p><b>Correo electrónico inválido</b></p> <p>Por favor, verifique los datos ingresados e intente nuevamente.</p>'
          : this.mensaje;

        (error.code == 'auth/user-not-found') ? this.mensaje =
          '<p><b>Usuario no encontrado</b></p> <p>Por favor, verifique que el correo ingresado sea el correcto e intente nuevamente.</p>'
          : this.mensaje;

        this.tipoMensaje = 'info';

        const dialogRef = this.dialog.open(VentanaInfoComponent, {
          maxWidth: '400px',
          data: { mensaje: this.mensaje, tipo: this.tipoMensaje },
          autoFocus: false,
          maxHeight: '90vh',
        });
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Delete a user by email
  DeleteUser(email: string) {

    const userEmail = {
      correo: email
    };

    return this.http.post(this.URL_API_ELIMINAR_USUARIO, userEmail, { responseType: 'text' });

  }

  // Sign out 
  SignOut() {
    this.trySignUp = false;
    this.doLogIn = false;
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('perfil');
      localStorage.removeItem('permisos');
      this.router.navigate(['login']);
    })
  }

  validarPermisoUsuario(permiso: string) {

    const localData = JSON.parse(localStorage.getItem('permisos'));

    const permisosUsuario = localData.permisos;

    if (Array.isArray(permisosUsuario) && permisosUsuario.length > 1) {

      if (permisosUsuario.includes(permiso)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

}