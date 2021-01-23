import { Component, OnInit } from "@angular/core";
import { BlogPostService } from "./service/blog-post.service";
import { VoteService } from "./service/vote.service";
import { BlogPost } from "./model/blog-post";
import { Vote } from "./model/votes";
import { AuthenticationService } from "../../../helpers/authentication.service";
import { MatDialog } from "@angular/material/dialog";
import { CommentDialogComponent } from "./modal/comment-dialog/comment-dialog.component";
import { PostCreateDialogComponent } from "./modal/post-create-dialog/post-create-dialog/post-create-dialog.component";
import { PostDetailsDialogComponent } from "./modal/post-details-dialog/post-details-dialog.component";

@Component({
  selector: "app-blog-post",
  templateUrl: "./blog-post.component.html",
  styleUrls: ["./blog-post.component.css"],
})
export class BlogPostComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  user: any;

  constructor(
    private blogPostService: BlogPostService,
    private voteService: VoteService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.getAllBlogPosts();
  }

  getAllBlogPosts() {
    this.blogPostService.getBlogPosts().subscribe((res) => {
      this.blogPosts = res.data;
      console.log("Res ===", this.blogPosts);
    });
  }

  upVote(data: any) {
    let vote = new Vote();
    vote.createdBy = this.user.id;
    vote.upVote = 1;
    vote.downVote = 0;
    vote.postId = data.id;
    this.voteService.saveVote(vote).subscribe((res) => {
      console.log("Vote submiteed ----");
      this.ngOnInit();
    });
  }

  downVote(data: any) {
    let vote = new Vote();
    vote.createdBy = this.user.id;
    vote.upVote = 0;
    vote.downVote = 1;
    vote.postId = data.id;
    this.voteService.saveVote(vote).subscribe((res) => {
      console.log("Vote submiteed ----");
      this.ngOnInit();
    });
  }

  getUpvote(data: any) {
    let count = 0;
    if (data.votes && data.votes.length > 0) {
      data.votes.forEach((element) => {
        count += Number(element.upVote);
      });
    }
    return count;
  }

  getDownvote(data: any) {
    let count = 0;
    if (data.votes && data.votes.length > 0) {
      data.votes.forEach((element) => {
        count += Number(element.downVote);
      });
    }
    return count;
  }

  openCommentDialog(post: any) {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      height: "600px",
      width: "800px",
      data: {
        postId: post.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  openPostCreateDialog() {
    const dialogRef = this.dialog.open(PostCreateDialogComponent, {
      height: "600px",
      width: "800px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  openPostDetailsDialog(post: BlogPost) {
    const dialogRef = this.dialog.open(PostDetailsDialogComponent, {
      height: "600px",
      width: "800px",
      data: {
        post: post,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
