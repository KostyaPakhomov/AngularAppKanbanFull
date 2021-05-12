import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StageModel} from '../models/stage.model';
// import {StageName} from '../project/project.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {map, take, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {StageService} from '../services/stage.service';
import {ProjectService} from '../services/project.service';
import {TaskModel} from '../models/task.model';
import {Assigner} from '../models/assigner.model';
import {Comment} from '../models/comment.model';
// import {Label} from '../models/label.model';
import {Attachment} from '../models/attachment.model';
import {ProjectModel} from '../models/project.model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ShareService} from '../services/share.service';
import Timestamp = firebase.firestore.Timestamp;
import {Label} from '../models/label.model';
// firebase.initializeApp(environment.config);

@Component({
  selector: 'app-project-stage',
  templateUrl: './project-stage.component.html',
  styleUrls: ['./project-stage.component.css']
})

export class ProjectStageComponent implements OnInit {
  @Input() stage!: StageModel;
  @Input() project!: ProjectModel;
  // project!: ProjectModel;
  stages!: StageModel[];
  // stage!: StageModel;
  reporter!: string;
  taskName!: string;
  description!: string;
  labels!: 'blue' | 'red' | 'green' | 'yellow';
  ticketNum!: number;
  dueDate!: number;
  tasks!: TaskModel[];
  option!: 'blue' | 'red' | 'green' | 'yellow';
  showTask!: string;
  @Output() newTask = new EventEmitter<TaskModel>();
  // @Output() newComments = new EventEmitter<Comment>();
  constructor(private projectService: ProjectService, private ss: ShareService) {
  }

  ngOnInit(): void {

  }
  // tslint:disable-next-line:typedef
  newComment(comment: Comment, task: TaskModel) {
    const elemIds = this.stage.tasks?.map(el => el.id);

    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < elemIds.length; i++) {
      if (elemIds) {
        const elementId = elemIds[i];
        // tslint:disable-next-line:triple-equals
        if (task.id == elementId) {
          // this.newComments.emit(comment);
          task.comments?.push(comment);
        }
      }
    }
    this.projectService.addComment(this.project);
  }
  // tslint:disable-next-line:typedef
  addNewTask() {
    const task: TaskModel = {
      id: Math.random(),
      reporter: this.reporter,
      assigners: [],
      createdDate: Timestamp.now(),
      dueDate: this.dueDate,
      taskName: this.taskName,
      description: this.description,
      comments: [],
      labels: this.labels,
      ticketNum: this.ticketNum,
      attachments: []
    };
    this.newTask.emit(
      task
   );
    // this.project.stages?.push(task);
    // this.projectService.addTask(this.project);
  }
  addTask(): void {
    this.showTask = 'block';
    // return this.showTask ? 'block' : 'none';
  }
  closeTaskAdding(): void {
    this.showTask = 'none';
  }
  // tslint:disable-next-line:typedef
  findOption(select: any) {
    this.option = select.labels;
    return this.option;
  }
  onDrop(event: CdkDragDrop<any[]>): void {
    this.ss.drop(event);
  }

}
