import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Categoria } from 'src/app/models/categoria';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  categoria: Categoria;

  categoriaGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  })

  subcategorias = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.subcategorias.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(subcategoria): void {
    const index = this.subcategorias.indexOf(subcategoria);

    if (index >= 0) {
      this.subcategorias.splice(index, 1);
    }
  }

  constructor(private readonly categoriasService: CategoriaService,
    public dialogRef: MatDialogRef<EditarCategoriaComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.getCategoria(this.data);
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  getCategoria(id) {
    this.categoriasService.getCategoria(id)
      .subscribe(res => {
        this.categoriasService.categoria = res as Categoria;
        this.categoria = this.categoriasService.categoria;
        this.subcategorias = this.categoria.subcategorias;
      })
  }

  editarCategoria() {
    this.showSpinner();

    this.categoria = {
      _id: this.categoria._id,
      nombre: this.categoriaGroup.value.nombre,
      subcategorias: this.subcategorias
    }
    this.dialogRef.close(this.categoria);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
