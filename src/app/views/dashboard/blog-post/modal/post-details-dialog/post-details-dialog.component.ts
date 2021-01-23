import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BlogPost } from "../../model/blog-post";
import { Comment } from "../../model/comment";
import { BlogPostService } from "../../service/blog-post.service";
import { CommentService } from "../../service/comment.service";
import { CommentDialogComponent } from "../comment-dialog/comment-dialog.component";

@Component({
  selector: "app-post-details-dialog",
  templateUrl: "./post-details-dialog.component.html",
  styleUrls: ["./post-details-dialog.component.css"],
})
export class PostDetailsDialogComponent implements OnInit {
  comments: Comment[] = [];
  showLoading: boolean = false;
  constructor(
    private blogPostService: BlogPostService,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    console.log("Data ===", this.data);
    if (this.data.post && this.data.post.id) {
      this.getComments();
    }
  }

  getComments() {
    this.showLoading = true;
    this.commentService.getComment(this.data.post.id).subscribe((res) => {
      this.comments = res.data;
      console.log(this.comments);
      this.showLoading = false;
    });
  }
}
