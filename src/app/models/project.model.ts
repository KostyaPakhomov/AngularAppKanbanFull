import {StageModel} from './stage.model';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface ProjectModel {
  projectName?: string;
  id?: number | string | undefined;
  projectDate?: Timestamp;
  stages?: StageModel[];
}
