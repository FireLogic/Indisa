import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoImagenComponent } from './info-imagen.component';

describe('InfoImagenComponent', () => {
  let component: InfoImagenComponent;
  let fixture: ComponentFixture<InfoImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
