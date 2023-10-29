import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsciiArtComponent } from './ascii-art.component';

describe('AsciiArtComponent', () => {
  let component: AsciiArtComponent;
  let fixture: ComponentFixture<AsciiArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsciiArtComponent]
    });
    fixture = TestBed.createComponent(AsciiArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
