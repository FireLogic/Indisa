import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';
import { MatDialog } from '@angular/material';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { VentanaInfoComponent } from 'src/app/shared/ventana-info/ventana-info.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';

declare var M: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];

  constructor(private readonly categoriaService: CategoriaService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getCategorias();
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  // Service get images
  getCategorias() {
    this.showSpinner();
    this.categoriaService.getCategorias()
      .subscribe(res => {
        this.categoriaService.categorias = res as Categoria[];
        this.categorias = this.categoriaService.categorias;
        this.hideSpinner();
      });
  }

  crearCategoria() {

    const dialogRef = this.dialog.open(CrearCategoriaComponent, {
      width: '500px',
      data: '',
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.categoriaService.postCategoria(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Categoría registrada exitosamente!' })
            this.getCategorias();
          })
      }
    });
  }

  editarCategoria(id) {

    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      width: '600px',
      data: id,
    })

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.categoriaService.putCategoria(res)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Categoría editada exitosamente!' })
            this.getCategorias();
          })
      }
    });
  }


  eliminarCategoria(categoria: Categoria) {

    const mensaje = '¿Desea eliminar la categoría <b>' + categoria.nombre + '</b> de manera permanente?'

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
        this.categoriaService.deleteCategoria(categoria._id)
          .subscribe(res => {
            this.hideSpinner();
            M.toast({ html: 'Categoría eliminada exitosamente!' })
            this.getCategorias();
          })
      }
    });
  }

}
