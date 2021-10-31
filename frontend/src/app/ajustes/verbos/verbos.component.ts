import { Component, OnInit } from '@angular/core';
import { VerboService } from 'src/app/shared/services/verbo.service';
import { Verbo } from 'src/app/models/verbo';
import { MatDialog } from '@angular/material';
import { CrearVerboComponent } from './crear-verbo/crear-verbo.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { EditarVerboComponent } from './editar-verbo/editar-verbo.component';

declare var M: any;

@Component({
  selector: 'app-verbos',
  templateUrl: './verbos.component.html',
  styleUrls: ['./verbos.component.css']
})
export class VerbosComponent implements OnInit {

  verbos: Verbo[];

  constructor(private readonly verboService: VerboService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getVerbos();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  getVerbos() {
    this.showSpinner();
    this.verboService.getVerbos()
      .subscribe(res => {
        this.verboService.verbos = res as Verbo[];
        this.verbos = this.verboService.verbos;
        console.log(this.verbos);
        this.hideSpinner();
      });
  }

  crearVerbo() {

    const dialogRef = this.dialog.open(CrearVerboComponent, {
      width: '500px',
      data: '',
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.verboService.postVerbo(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Verbo registrado exitosamente!' })
            this.getVerbos();
          })
      }
    });
  }

  editarVerbo(id) {

    const dialogRef = this.dialog.open(EditarVerboComponent, {
      width: '600px',
      data: id,
    })

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.verboService.putVerbo(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Verbo editado exitosamente!' })
            this.getVerbos();
          })
      }
    });
  }


  eliminarVerbo(verbo: Verbo) {

    const mensaje = '¿Desea eliminar el verbo <b>' + verbo.nombre + '</b> de manera permanente?'

    const dialogRef = this.dialog.open(VentanaInfoComponent, {
      maxWidth: '400px',
      data: {
        mensaje: mensaje,
        tipo: 'eliminar'
      },
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res == true) {
        this.showSpinner();
        this.verboService.deleteVerbo(verbo._id)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Verbo eliminado exitosamente!' })
            this.getVerbos();
          })
      }
    });
  }

}
