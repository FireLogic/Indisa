import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAjustesComponent } from './menu-ajustes.component';

describe('MenuAjustesComponent', () => {
  let component: MenuAjustesComponent;
  let fixture: ComponentFixture<MenuAjustesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAjustesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
