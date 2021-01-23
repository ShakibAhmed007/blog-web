import { Vote } from "./votes";

export class BlogPost {
  id: string;
  postDescription: string;
  postStatus: number;
  postTitle: string;
  createdBy: string;
  votes: Vote[];
}
