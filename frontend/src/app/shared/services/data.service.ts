import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Se define un mensaje por defecto
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  // Se define un mensaje por defecto
  private userInfo = new BehaviorSubject('default message');
  currentUserInfo = this.userInfo.asObservable();

  constructor() { }

  // Servicio para intercambiar información (mensaje) entre componentes de Angular
  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  // Servicio para intercambiar información (user info) entre componentes de Angular
  setInfoUser(user: any) {
    this.userInfo.next(user);
  }



}
