import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  tasks = [];
  // name = prompt('Add name of project');
  nameTask: string | undefined;
  constructor() {
  }
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  addTask() {
    // @ts-ignore
    this.tasks.push(this.nameTask = prompt('Add task'));
  }

}
