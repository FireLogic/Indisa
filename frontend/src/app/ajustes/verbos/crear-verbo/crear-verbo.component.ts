import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Verbo } from 'src/app/models/verbo';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-crear-verbo',
  templateUrl: './crear-verbo.component.html',
  styleUrls: ['./crear-verbo.component.css']
})
export class CrearVerboComponent implements OnInit {

  verbo: Verbo;

  verboGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  })

  //subcategorias = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    /**
    // Add our fruit
    if ((value || '').trim()) {
      this.subcategorias.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
     */
  }
  /** 
  remove(subcategoria): void {
    const index = this.subcategorias.indexOf(subcategoria);

    if (index >= 0) {
      this.subcategorias.splice(index, 1);
    }
  }
  */
  constructor(public dialogRef: MatDialogRef<CrearVerboComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  crearVerbo() {

    this.showSpinner();

    this.verbo = {
      _id: '',
      nombre: this.verboGroup.value.nombre
    }
    
    this.dialogRef.close(this.verbo);
  }

}
