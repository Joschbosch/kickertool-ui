import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentshowComponent } from './tournamentshow.component';

describe('TournamentshowComponent', () => {
  let component: TournamentshowComponent;
  let fixture: ComponentFixture<TournamentshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
