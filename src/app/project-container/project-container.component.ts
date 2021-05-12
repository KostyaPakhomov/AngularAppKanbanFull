import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ProjectModel} from '../models/project.model';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {TaskModel} from '../models/task.model';
@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})

export class ProjectContainerComponent implements OnInit {
  projects!: ProjectModel[];
  projectName!: string;
  projectDate!: Timestamp;
  count = 0;
  showProjectAdding!: string;
  showProject!: string;
  option!: string;
  selec = false;
  id!: string;
  currentId!: number | string | undefined;
  filterTerm!: string;
  projName!: string | undefined;
  showProjBtn!: string;
  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      console.log(projects);
      this.projects = projects;
    });
  }
  addNewProject(): void {
    // tslint:disable-next-line:triple-equals
    if (this.projectName) {
      const project: ProjectModel = {
        projectName: this.projectName,
        id: ++this.count,
        projectDate: Timestamp.now(),
        // id: project.id,
        stages: []
      };
      this.projectService.addProject(project);
      this.showProjBtn = 'block';
      this.showProjectAdding = 'none';
    }
  }
  addProject(): void {
    this.showProjectAdding = 'block';
    this.showProjBtn = 'none';
  }
  hideProjectAdding(): void {
    this.showProjectAdding = 'none';
    this.showProjBtn = 'block';
  }

  showCurrentProject(project: ProjectModel): void {
    this.currentId = project.id;
    this.projName = project.projectName;
    console.log('currentId' + project.id);
  }

}
