import {TaskModel} from './task.model';

export interface StageModel {
  num?: number | string;
  title?: string;
  id?: number | string;
  tasks?: TaskModel[];
}
