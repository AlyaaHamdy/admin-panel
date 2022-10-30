import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersDialogComponent } from './trainers-dialog.component';

describe('TrainersDialogComponent', () => {
  let component: TrainersDialogComponent;
  let fixture: ComponentFixture<TrainersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
