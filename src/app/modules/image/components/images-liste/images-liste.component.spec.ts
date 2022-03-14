import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesListeComponent } from './images-liste.component';

describe('ImagesListeComponent', () => {
  let component: ImagesListeComponent;
  let fixture: ComponentFixture<ImagesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
