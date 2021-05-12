import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ProjectModel} from '../models/project.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StageModel} from '../models/stage.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // @ts-ignore
  projectsCollection: AngularFirestoreCollection<ProjectModel>;
  projects: Observable<ProjectModel[]>;
  // stages: Observable<StageModel[]>;
  constructor(public  firestore: AngularFirestore) {
    this.projectsCollection = this.firestore.collection('projects', ref => ref.orderBy('projectDate', 'asc'));
    // this.comments = this.commentsCollection.valueChanges();
    this.projects = this.projectsCollection.snapshotChanges().pipe(map(changes => {
      // @ts-ignore
      return changes.map(a => {
        const data = a.payload.doc.data() as ProjectModel;
        // @ts-ignore
        data.id = a.payload.doc.id;
        return data;
      });
    }) );
    // this.stages = this.projectsCollection.snapshotChanges().pipe(map(stages => {
    //   return stages.map(a => {
    //     const st = a.payload.doc.data() as StageModel;
    //     // st.tasks = a.payload.doc.ref;
    //     return st;
    //   });
    // }));
  }
  // tslint:disable-next-line:typedef
  getProjects() {
    return this.projects;
  }
  // tslint:disable-next-line:typedef
  // getStages() {
  //   return this.stages;
  // }
  // tslint:disable-next-line:typedef
  addProject(project: ProjectModel) {
    // this.firestore.collection('projects').doc(`${project.id}`).set(project);
    this.firestore.collection('projects').add(project);
  }
  // tslint:disable-next-line:typedef
  addStage(project: ProjectModel) {
    console.log(project.stages);
    this.firestore.collection('projects').doc(project.id?.toString()).set(project).then(() => {
        console.log('DOCUMENT WRITTEN');
    });
    // this.projectsCollection.doc(`${stages.id}`).set(stages);
  }
  // tslint:disable-next-line:typedef
  addTask(project: ProjectModel) {
    this.firestore.collection('projects').doc(project.id?.toString()).set(project).then(() => {
      console.log('task WRITTEN');
    });
  }
  // tslint:disable-next-line:typedef
  addComment(project: ProjectModel) {
    this.firestore.collection('projects').doc(project.id?.toString()).set(project).then(() => {
      console.log('comment WRITTEN');
    });
  }
  // deleteStage(project: ProjectModel): void {
  //   const stageDoc = this.firestore.collection('projects').doc(project.id?.toString());
  //
  //   stageDoc.delete();
  // }

}
