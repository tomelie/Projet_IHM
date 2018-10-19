import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayconnexionComponent } from './overlayconnexion.component';

describe('OverlayconnexionComponent', () => {
  let component: OverlayconnexionComponent;
  let fixture: ComponentFixture<OverlayconnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayconnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayconnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
