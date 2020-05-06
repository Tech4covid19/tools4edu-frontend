export interface IBlogArticle {
  id?: string,
  title?: string,
  summary?: string,
  author?: string,
  images?: string[],
  text?: string,
  slug: string,
  published: boolean,
  createdAt?: Date,
  videoUrl?: string
}
