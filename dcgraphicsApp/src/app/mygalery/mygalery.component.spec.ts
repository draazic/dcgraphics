import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MygaleryComponent } from './mygalery.component';

describe('MygaleryComponent', () => {
  let component: MygaleryComponent;
  let fixture: ComponentFixture<MygaleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MygaleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MygaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
