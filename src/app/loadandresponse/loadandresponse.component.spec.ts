import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadandresponseComponent } from './loadandresponse.component';

describe('LoadandresponseComponent', () => {
  let component: LoadandresponseComponent;
  let fixture: ComponentFixture<LoadandresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadandresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadandresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
