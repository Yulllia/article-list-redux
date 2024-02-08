import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleAsync } from "../../redux/asyncSlice";
import { ArticleItem, AsyncArticles, List, ListAsync } from "../../interfaces/interface";
import Spinner from "react-bootstrap/Spinner";

function NewsPage() {
  const dispatch = useDispatch();
  const list = useSelector((state: ListAsync) => state.asyncArticles.list);
  const isLoading = useSelector((state: AsyncArticles) => state.asyncArticles.isLoading);
  const error = useSelector((state: AsyncArticles) => state.asyncArticles.error);

  const { articles } = list

  useEffect(() => {
    dispatch(getArticleAsync())
  }, [dispatch]);


  if (isLoading) {
    return <div><Spinner animation="border" /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


console.log(articles)
  return (
    <div>
      <h1>News Articles</h1>
      <ul>
        {articles?.map((article: ArticleItem) => (
          <li key={article.title}>
            <p>{article.title}</p> - {article.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsPage;
