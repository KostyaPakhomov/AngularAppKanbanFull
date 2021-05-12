import {Comment} from './comment.model';
// import {Label} from './label.model';
import {Attachment} from './attachment.model';
import {Assigner} from './assigner.model';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface TaskModel {
  id?: number;
  reporter?: string;
  assigners?: Assigner[];
  createdDate?: Timestamp;
  dueDate?: number;
  taskName?: string;
  description?: string;
  comments?: Comment[];
  labels?: 'blue' | 'red' | 'green' | 'yellow';
  ticketNum?: number;
  attachments?: Attachment[];
}
