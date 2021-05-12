import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ShareService} from '../services/share.service';
import {Comment} from '../models/comment.model';
import {CommentService} from '../services/comment.service';
import {DatePipe} from '@angular/common';
import {isFirebaseDataSnapshot} from '@angular/fire/database/utils';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {TaskModel} from '../models/task.model';


@Component({
  selector: 'app-project-stage-task',
  templateUrl: './project-stage-task.component.html',
  styleUrls: ['./project-stage-task.component.css']
})
export class ProjectStageTaskComponent implements OnInit {
  @Input() taski!: TaskModel;
  @Input() option!: string;
  id!: number;
  commentDate!: Timestamp;
  // commentAuthor!: string;
  commentText!: string;
  showComment!: string;
  disabled!: boolean;
  showComments = 'none';
  @Output() newComment = new EventEmitter<Comment>();
  // taskss!: TaskModel[];
  // comment: Comment = {
  //   commentText: '',
  //   commentAuthor: '',
  //   commentDate: Timestamp.now()
  // };
  // tasks: string[] = [];
  // name!: string;
  // arr = [];
  // comments!: Comment[];
  // thisDate!: Timestamp;
  constructor(private ss: ShareService, private commentService: CommentService) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  addNewComment() {
    const comment: Comment = {
      id: Math.random(),
      // commentAuthor: this.commentAuthor,
      commentText: this.commentText,
      commentDate: Timestamp.now()
    };
    this.newComment.emit(
      comment
    );
    // this.project.stages?.push(task);
    // this.projectService.addTask(this.project);
  }
  addComment(): void {
    this.showComment = 'block';
    this.disabled = true;
    // return this.showTask ? 'block' : 'none';
  }
  closeCommentAdding(): void {
    this.showComment = 'none';
    this.disabled = false;
  }
  showAllComments(): void {
    // tslint:disable-next-line:triple-equals
    if (this.showComments == 'none') {
      this.showComments = 'block';
    } else {this.showComments = 'none'}
  }
  // // tslint:disable-next-line:typedef
  // onSubmit() {
  //   // tslint:disable-next-line:triple-equals
  //   if (this.comment.commentText != '' && this.comment.commentAuthor != '') {
  //     this.commentService.addComment(this.comment);
  //     this.comment.commentText = '';
  //     this.comment.commentAuthor = '';
  //     // this.comment.commentDate = new Date();
  //   }
  // }
  onDrop(event: CdkDragDrop<string[]>): void {
    this.ss.drop(event);
  }
  // showComments(): void {
  //   const com = document.getElementById('comm_content');
  //   // @ts-ignore
  //   com.style.display = 'block';
  // }
  // hideComments(): void {
  //   const com = document.getElementById('comm_content');
  //   // @ts-ignore
  //   com.style.display = 'none';
  // }

}
