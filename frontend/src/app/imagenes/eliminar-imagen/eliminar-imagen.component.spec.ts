import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarImagenComponent } from './eliminar-imagen.component';

describe('EliminarImagenComponent', () => {
  let component: EliminarImagenComponent;
  let fixture: ComponentFixture<EliminarImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
