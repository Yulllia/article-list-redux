export interface ArticleItem {
  id: number;
  title: string;
  description: string;
  author: string;
  urlToImage: string;
}

export interface List {
  articles: InitialState;
}
export interface ListAsync {
    asyncArticles: {
        list: {
          articles: ArticleItem[] | undefined;
        }
    }
  }

export interface AsyncArticles {
  asyncArticles: InitialStateAsyncArtivles;
}
export interface InitialStateAsyncArtivles {
  list: ArticleItem[] | undefined;
  isLoading: boolean;
  error: undefined | string;
  searchValue: string;
}

export interface InitialState {
  list: ArticleItem[];
  pinnedItem: null;
  searchTerm: string;
}

export type ArticleAction =
  | { type: "SET_FIELD"; field: keyof ArticleItem; value: string }
  | { type: "RESET_FORM" };
