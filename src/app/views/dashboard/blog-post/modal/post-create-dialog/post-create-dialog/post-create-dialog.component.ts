import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthenticationService } from "../../../../../../helpers/authentication.service";
import { BlogPost } from "../../../model/blog-post";
import { BlogPostService } from "../../../service/blog-post.service";
import { CommentService } from "../../../service/comment.service";
import { CommentDialogComponent } from "../../comment-dialog/comment-dialog.component";

@Component({
  selector: "app-post-create-dialog",
  templateUrl: "./post-create-dialog.component.html",
  styleUrls: ["./post-create-dialog.component.css"],
})
export class PostCreateDialogComponent implements OnInit {
  postForm: FormGroup;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private blogPostService: BlogPostService,
    public dialogRef: MatDialogRef<PostCreateDialogComponent>
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.postForm = this.formBuilder.group({
      postTitle: ["", Validators.required],
      postDescription: ["", Validators.required],
    });
  }

  savePost() {
    let blogPost = new BlogPost();
    blogPost.postTitle = this.postForm.controls["postTitle"].value;
    blogPost.postDescription = this.postForm.controls["postDescription"].value;
    blogPost.createdBy = this.user.id;
    blogPost.postStatus = 1;

    this.blogPostService.saveBlogPost(blogPost).subscribe((res) => {
      if (res) {
        this.dialogRef.close(res);
      }
    });
  }
}
