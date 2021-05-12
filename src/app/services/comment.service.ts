import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Comment} from '../models/comment.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // @ts-ignore
  commentsCollection: AngularFirestoreCollection<Comment>;
  comments: Observable<Comment[]>;
  constructor(public  firestore: AngularFirestore) {
    this.commentsCollection = this.firestore.collection('comments', ref => ref.orderBy('commentDate', 'desc'));
    // this.comments = this.commentsCollection.valueChanges();
    this.comments = this.commentsCollection.snapshotChanges().pipe(map(changes => {
      // @ts-ignore
      return changes.map(a => {
        const data = a.payload.doc.data() as Comment;
        // @ts-ignore
        data.id = a.payload.doc.id;
        return data;
      });
    }) );
  }
  // tslint:disable-next-line:typedef
  getComments() {
    return this.comments;
  }

  // tslint:disable-next-line:typedef
  addComment(comment: Comment) {
    this.commentsCollection.add(comment);
  }
}
