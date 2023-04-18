export interface Tag {
  id: number;
  name: string;
  slug: string;
  group_id: number;
  user_id: number;
}

export interface TagRequest {
  tag: Pick<Tag, "name">;
}

export interface TagResponse {
  tag: Tag;
  message: string;
}
