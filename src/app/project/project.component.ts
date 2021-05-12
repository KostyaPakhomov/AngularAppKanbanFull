import {Component, Input, OnInit} from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {StageService} from '../services/stage.service';
import {StageModel} from '../models/stage.model';
import {ProjectService} from '../services/project.service';
import {Comment} from '../models/comment.model';
import {ProjectModel} from '../models/project.model';
import {TaskModel} from '../models/task.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input()
  project!: ProjectModel;
  @Input() option!: string;
  @Input() currentId!: number | string | undefined;
  // stage!: StageModel;
  // stage!: StageModel;
  // sta!: StageModel;
  // tasks!: TaskModel[];
  stageTitle!: string;
  stageNum!: number;
  showNewStage!: string;
  disabled!: boolean;
  showProjects!: string;
  constructor(private stageService: StageService, private projectService: ProjectService) {
  }
  ngOnInit(): void {
    // this.projectService.getStages().subscribe(stages => {
    //   console.log('THIS STAGES' + stages);
    //   // this.stages = stages;
    // });
  }
  addNewStage(): void {
      const stage: StageModel = {
        title: this.stageTitle,
        num: this.stageNum,
        tasks: [],
        id: Math.random()
      };
      this.project.stages?.push(stage);
      this.projectService.addStage(this.project);
  }
  addStage(): void {
    this.showNewStage = 'inline-block';
    this.disabled = true;
    // return this.showTask ? 'block' : 'none';
  }
  closeStageAdding(): void {
    this.showNewStage = 'none';
    this.disabled = false;
  }
  // tslint:disable-next-line:typedef
  newTask(task: TaskModel, stage: StageModel) {
    // this.project.stages?.map(stage => stage.tasks?.push(task));
      const elemIds = this.project.stages?.map(el => el.id);
      // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < elemIds?.length; i++) {
        if (elemIds) {
          const elementId = elemIds[i];
          // tslint:disable-next-line:triple-equals
          if (stage.id == elementId) {
            console.log(stage.id + '' + elementId);
            stage.tasks?.push(task);
            // return stage.id;
          }
        }
      }
      this.projectService.addTask(this.project);
  }

  // tslint:disable-next-line:typedef
  // newComments(comment: Comment, stage: StageModel) {
  //   // this.project.stages?.map(stage => stage.tasks?.push(task));
  //   const elemIds = this.project.stages?.map(el => el.id);
  //   // @ts-ignore
  //   // tslint:disable-next-line:prefer-for-of
  //   for (let i = 0; i < elemIds?.length; i++) {
  //     if (elemIds) {
  //       const elementId = elemIds[i];
  //       // tslint:disable-next-line:triple-equals
  //       if (stage.id == elementId) {
  //         // console.log(stage.id + '' + elementId);
  //         stage.tasks?.map(el => {
  //           const elem = el.comments;
  //           elem?.push(comment);
  //         });
  //       }
  //     }
  //   }
  //   this.projectService.addComment(this.project);
  // }

  // // @ts-ignore
  // deleteStage(event, stage: StageModel): void {
  //   const message = confirm('Do you really want to delete this stage?');
  //   // alert(message);
  //   if (message === true) {
  //     this.stageService.deleteStage(stage);
  //   }
  // }
}
