import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Comment } from "../../model/comment";
import { AuthenticationService } from "../../../../../helpers/authentication.service";
import { CommentService } from "../../service/comment.service";

@Component({
  selector: "app-comment-dialog",
  templateUrl: "./comment-dialog.component.html",
  styleUrls: ["./comment-dialog.component.css"],
})
export class CommentDialogComponent implements OnInit {
  commentForm: FormGroup;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authenticationService: AuthenticationService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.commentForm = this.formBuilder.group({
      comment: ["", Validators.required],
    });
  }

  saveComment() {
    let commentModel = new Comment();
    commentModel.postId = this.data.postId;
    commentModel.comment = this.commentForm.controls["comment"].value;
    commentModel.createdBy = this.user.id;
    commentModel.status = 1;

    this.commentService.saveComment(commentModel).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(res);
    });
  }
}
