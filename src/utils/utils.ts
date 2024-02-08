import { ArticleItem } from "../interfaces/interface";

export const filterArticles = (articles: ArticleItem[] | undefined, search: string) => {
    return articles?.filter(
      (article) =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.description.toLowerCase().includes(search.toLowerCase())
    );
  };