import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { ProjectStageComponent } from './project-stage/project-stage.component';
import { ProjectStageTaskComponent } from './project-stage-task/project-stage-task.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ShareService} from './services/share.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
// import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {StageService} from './services/stage.service';
import {FormsModule} from '@angular/forms';
import {CommentService} from './services/comment.service';
import {ProjectContainerComponent} from './project-container/project-container.component';
import {CommentsComponent} from './comments/comments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {BoardComponent} from './auth/board/board.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './auth/verify-email/verify-email.component';
import {AppRoutingModule} from './app-routing.module';
import {NgAuthService} from './ng-auth.service';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    ProjectStageComponent,
    ProjectComponent,
    ProjectStageTaskComponent,
    ProjectContainerComponent,
    CommentsComponent,
    SignInComponent,
    SignUpComponent,
    BoardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config, 'angular-app-kanban'),
    // AngularFireAnalyticsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    Ng2SearchPipeModule
  ],
  providers: [
    ShareService,
    StageService,
    CommentService,
    NgAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
