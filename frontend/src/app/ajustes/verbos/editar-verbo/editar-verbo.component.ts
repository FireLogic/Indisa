import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Verbo } from 'src/app/models/verbo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { VerboService } from 'src/app/shared/services/verbo.service';

@Component({
  selector: 'app-editar-verbo',
  templateUrl: './editar-verbo.component.html',
  styleUrls: ['./editar-verbo.component.css']
})
export class EditarVerboComponent implements OnInit {

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
  } */

  constructor(private readonly verbosService: VerboService,
    public dialogRef: MatDialogRef<EditarVerboComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.getVerbo(this.data);
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  getVerbo(id) {
    this.verbosService.getVerbo(id)
      .subscribe(res => {
        this.verbosService.verbo = res as Verbo;
        this.verbo = this.verbosService.verbo;
      })
  }

  editarVerbo() {
    this.showSpinner();

    this.verbo = {
      _id: this.verbo._id,
      nombre: this.verboGroup.value.nombre
    }
    this.dialogRef.close(this.verbo);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
