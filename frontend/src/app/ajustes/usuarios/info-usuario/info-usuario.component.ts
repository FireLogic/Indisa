import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {


  usuario: Usuario;

  constructor(public dialogRef: MatDialogRef<InfoUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) { }

  ngOnInit() {
    this.usuario = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
