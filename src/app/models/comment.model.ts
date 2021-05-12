import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Comment {
  id?: number;
  commentText?: string;
  commentDate?: Timestamp;
  commentAuthor?: string;
}
