import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {StageModel} from '../models/stage.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProjectModel} from '../models/project.model';
import {Comment} from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  // @ts-ignore
  stagesCollection: AngularFirestoreCollection<StageModel>;
  stages: Observable<StageModel[]>;
  stageDoc!: AngularFirestoreDocument<StageModel>;
  constructor(public  firestore: AngularFirestore) {
    // // @ts-ignore
    // this.stages = this.firestore.collection('project_stages').valueChanges();
    this.stageDoc = this.firestore.doc('projects/stages');
    this.stagesCollection = this.firestore.collection('projects');
      // .doc(`${indexedDB}`).collection('project_stages');
    // this.comments = this.commentsCollection.valueChanges();
    this.stages = this.stagesCollection.snapshotChanges().pipe(map(changes => {
      // @ts-ignore
      return changes.map(a => {
        const data = a.payload.doc.data() as StageModel;
        // @ts-ignore
        data.id = a.payload.doc.id;
        return data;
      });
    }) );
  }
  // tslint:disable-next-line:typedef
  // getStages() {
  //   return this.stages;
  // }
  // addStage(stage: ProjectModel): void {
  //   this.stagesCollection.add(stage);
  // }
  // deleteStage(stage: StageModel): void {
  //   this.stageDoc = this.firestore.doc(`project_stages/${stage.id}`);
  //   this.stageDoc.delete();
  // }
}
