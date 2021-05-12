import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStageTaskComponent } from './project-stage-task.component';

describe('ProjectStageTaskComponent', () => {
  let component: ProjectStageTaskComponent;
  let fixture: ComponentFixture<ProjectStageTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStageTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStageTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
