import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-stage',
  templateUrl: './project-stage.component.html',
  styleUrls: ['./project-stage.component.css']
})

export class ProjectStageComponent implements OnInit {
  title: string | null = 'Write stage';
  projects = [];
  // name = prompt('Add name of project');
  name: string | undefined;
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  stageName() {
    this.title = prompt('Add neme of stage');
  }
  // tslint:disable-next-line:typedef
  addProject() {
    // @ts-ignore
    this.projects.push(this.name = prompt('Add'));
  }

}
