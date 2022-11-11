import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTraineeComponent } from './assigned-trainee.component';

describe('AssignedTraineeComponent', () => {
  let component: AssignedTraineeComponent;
  let fixture: ComponentFixture<AssignedTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTraineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
