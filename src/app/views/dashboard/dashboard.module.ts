import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BlogPostComponent } from './blog-post/blog-post.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { CommentDialogComponent } from './blog-post/modal/comment-dialog/comment-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule } from '@angular/forms';
import { PostCreateDialogComponent } from './blog-post/modal/post-create-dialog/post-create-dialog/post-create-dialog.component';
import { PostDetailsDialogComponent } from './blog-post/modal/post-details-dialog/post-details-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent, BlogPostComponent, CommentDialogComponent, PostCreateDialogComponent, PostDetailsDialogComponent],
  entryComponents: [CommentDialogComponent, PostCreateDialogComponent, PostDetailsDialogComponent]
})
export class DashboardModule { }
