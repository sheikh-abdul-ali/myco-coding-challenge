import { Comment } from "./comment";

export interface Post {
	id: string;
	title: string;
	userId: string;
	content: string;
	comments: Comment[];
}
