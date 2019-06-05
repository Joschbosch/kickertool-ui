import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayereditComponent } from './playeredit.component';

describe('PlayereditComponent', () => {
  let component: PlayereditComponent;
  let fixture: ComponentFixture<PlayereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
